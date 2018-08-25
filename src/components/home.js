import React from 'react';
import {Button, Jumbotron }  from 'react-bootstrap';
import {Link} from 'react-router-dom';
import style from './Home.scss';

function Home() {
    return (
      <div className={style.HomeContainer}>
        <Jumbotron >
          <h1>"Github Battle: Battle your friends... and stuff"</h1>
          <div className={style.WellStyle}>
            <Link  to="/battle" ><Button bsStyle="primary" bsSize="large" block>Start Battle</Button></Link>
          </div>
        </Jumbotron>
      </div>

    );
  }

 export default Home;
