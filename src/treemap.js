import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import equal from 'deep-equal';

const WIDTH = 800;
const HEIGHT = 400;
const color = d3.scale.category10();

export default class Treemap extends Component {
  static displayName = 'Treemap';
  static propTypes = {
    data: PropTypes.object.isRequired,
    onMoveDown: PropTypes.func.isRequired,
    onShowDetail: PropTypes.func.isRequired,
    onHideDetail: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.renderTreemap();
  }

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.data, this.props.data)) {
      this.renderTreemap();
    }
  }

  renderTreemap() {
    if (this.svg) {
      d3.select(this.refs.content).selectAll('svg').remove();
    }

    this.svg = d3.select(this.refs.content).append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

    const { data, onMoveDown, onShowDetail, onHideDetail } = this.props;

    const layer = this.svg.append('g');

    const treemap = d3.layout.treemap()
      .children(d => d.children)
      .value(d => d.size)
      .size([WIDTH, HEIGHT]);

    const next = d => d.depth === 1;
    const nodes = treemap.nodes(data);
    const children = layer.selectAll('g').data(nodes);

    children
      .enter().append('g')
        .filter(next)
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .style('cursor', d => d.children ? 'pointer' : 'normal')
        .on('click', function (d) {
          if (d.children) {
            onMoveDown(d.name);
          }
        })
        .on('mousemove', function (d) {
          const el = document.getElementById('container');
          const [x, y] = d3.mouse(el);
          onShowDetail({ x, y }, d.name);
        })
        .on('mouseleave', function (d) {
          onHideDetail();
        });

    children.append('rect')
        .filter(next)
        .attr('width', d => d.dx)
        .attr('height', d => d.dy)
        .attr('fill', (d, i) => color(i));
  }

  render() {
    return <div ref="content" />;
  }
}
