import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Treemap from './treemap';
import { moveDown } from './actions';

const DATA = {
  name: 'ROOT',
  children: [
    {
      name: 'A',
      children: [
        {
          name: 'AA',
          children: [
            {
              name: 'AAA',
              value: 4
            },
            {
              name: 'BBB',
              value: 8
            },
            {
              name: 'CCC',
              value: 16
            },
          ]
        },
      ]
    },
    {
      name: 'B',
      children: [
        {
          name: '1',
          value: 10
        },
        {
          name: '2',
          value: 20
        },
        {
          name: '3',
          value: 30
        },
      ]
    },
    {
      name: 'C',
      value: 15
    },
    {
      name: 'D',
      children: [
        {
          name: '000',
          value: 5,
        },
        {
          name: '001',
          value: 6,
        },
        {
          name: '010',
          value: 7,
        },
        {
          name: '011',
          value: 8,
        },
      ]
    }
  ]
};

function crop(path) {
  let cropped = DATA;
  const remain = [...path];
  while (0 < remain.length) {
    const name = remain.shift();
    if (typeof cropped.children === 'undefined') {
      console.warn(`No children, this is a leaf node`);
      break;
    }
    const matches = cropped.children.filter(c => c.name === name);
    if (1 < matches.length) {
      console.warn(`Found multiple nodes which have same name: '${name}'`);
      break;
    }
    if (matches.length === 0) {
      console.warn(`No child named '${name}'`);
      break;
    }
    cropped = matches[0];
  }
  return cropped;
}

@connect(({ app }) => ({ app }))
export default class Home extends Component {
  static displayName = 'Home';
  static contextTypes = { router: PropTypes.object };

  handleMoveDown(name) {
    const { location } = this.props;
    const { router } = this.context;
    if (location.pathname.slice(-1) !== '/') {
      name = '/' + name;
    }
    router.push(`${location.pathname}${name}`);
  }

  handleMoveTo(path) {
    const { router } = this.context;
    router.push(path);
  }

  render() {
    const { location } = this.props;
    const path = location.pathname.split('/').filter(s => 0 < s.length);
    const cropped = crop(path);
    return (
      <div>
        <h1>treemap-with-router</h1>
        <h2>
          <Link to="/">[TOP]</Link>
          {path.map((name, i) => (
            <span>
              {' / '}
              <Link to={'/' + path.slice(0, i + 1).join('/')}>{name}</Link>
            </span>
          ))}
        </h2>
        <Treemap data={cropped} onMoveDown={::this.handleMoveDown} />
      </div>
    );
  }
}
