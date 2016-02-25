import React, { Component, PropTypes } from 'react';

export default class Root extends Component {
  static displayName = 'Root';
  static childContextTypes = { location: PropTypes.object };

  constructor(props) {
    super(props);
    this.childContext = { location: props.location };
    console.log('Root.context', this.context);
    console.log('Root.props', props);
  }

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
