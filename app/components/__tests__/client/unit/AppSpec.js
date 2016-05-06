// See this for some tips with Meteor: https://medium.com/all-about-meteorjs/unit-test-react-components-in-meteor-a19d96684d7d

// If you import ../App you'll have to stub out Meteor, this is
// why it's important to use controller-views that just setup
// data and then the children can be very easily tested with
// just props and state. We'll use a local component for an example

import React, { Component, PropTypes } from 'react';
import { mount } from 'enzyme';

class Post extends Component {
  static defaultProps = {
    title: 'Default Post Name',
  };
  static propTypes = {
    title: PropTypes.string,
  };
  state = {
    isVisible: true,
  };
  handleHide = () => {
    this.setState({ isVisible: false });
  };
  render() {
    const visibleClass = (this.state.isVisible) ? 'block' : 'hidden';
    return (
      <div className="Post" style={{ display: visibleClass }}>
        <h1>{this.props.title}</h1>
        <article>
          How now brown cow
        </article>
        <button onClick={this.handleHide}>Hide</button>
      </div>
    );
  }
}

describe('Sample post component', () => {
  it('renders default post name without props', () => {
    const comp = mount(<Post />);
    expect(comp.find('h1').text()).toEqual('Default Post Name');
  });

  it('renders correct post name with a name prop', () => {
    const comp = mount(<Post title="Webpack is awesome!" />);
    expect(comp.find('h1').text()).toEqual('Webpack is awesome!');
  });

  it('should have a default state of visible', () => {
    const comp = mount(<Post />);
    expect(comp.find('.Post').prop('style').display).toEqual('block');
  });

  it('should hide when hide button is clicked', () => {
    const comp = mount(<Post />);
    comp.find('button').simulate('click');
    expect(comp.find('.Post').prop('style').display).toEqual('hidden');
  });
});
