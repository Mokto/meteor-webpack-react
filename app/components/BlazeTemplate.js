/* global Blaze */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class BlazeTemplate extends Component {
  static propTypes = {
    template: React.PropTypes.any.isRequired,
    component: React.PropTypes.any,
  }
  static defaultProps = {
    component: 'div',
  }
  componentDidMount() {
    const { template } = this.props;
    this.view = Blaze.render(template, ReactDOM.findDOMNode(this.refs.root));
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
  render() {
    const { component } = this.props;
    let { ...props } = this.props;
    props.ref = 'root';
    return React.createElement(component, props);
  }
}
