import React, { Component } from 'react';
import {Button}  from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Home extends Component {

  render() {
    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    return (
      <div className="home-container">
        <h1>"Github Battle: Battle your friends... and stuff"</h1>
        <div className="well" style={wellStyles}>
          <Link classname="" to="/battle" ><Button bsStyle="primary" bsSize="large" block>Start Battle</Button></Link>
        </div>
      </div>
        );
  }
}


 export default Home;
