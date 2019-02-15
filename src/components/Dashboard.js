import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        This is a Dashboard component - hello UserID: {this.props.userID} 
      </div>
    );
  }
}