import React, { Component } from 'react';


export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar navbar-expand-md navbar-dark bg-dark fixed-top" style={{ backgroundColor: "#ef5350"}}>
        <a href=' ' className='navbar-brand col-sm-3 col-md-2 mr-0 align-item-center'>Pokemon</a>
      </div>
    );
  }
}
