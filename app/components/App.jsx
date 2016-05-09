/* global ReactMeteorData */
import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import { Users, Posts } from 'collections';
import './App.css';

Meteor.call('sayHello', (err, res) => {
  console.log(res);
});

@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    return {
      usersCount: Users.find().fetch().length,
      postsCount: Posts.find().fetch().length
    };
  }

  render() {
    const { usersCount, postsCount } = this.data;

    return (
      <div className="App">
        {Meteor.isClient && <BlazeTemplate template={Template.loginButtons} />}
        <h1>Hello Webpack!</h1>
        <p>There are {usersCount} users in the Minimongo  (login to change)</p>
        <p>There are {postsCount} posts in the Minimongo  (autopublish removed)</p>
      </div>
    );
  }
}
