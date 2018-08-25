import React, { Component } from 'react';
import api from '../service/api';
import Loading from './Loading';
import style from './Popular.scss';
import { Grid, Row, Col, Image, Badge, Button } from 'react-bootstrap';
import 'loaders.css';

class Popular extends Component {
  constructor(props) {
      super(props);
      this.state = {
        repos:[],
        count:0
      }
  }
  componentDidMount() {
    this.setState(function () {
      return {
        repos: null
      }
    });

    api.fetchPopularRepos('all')
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        });
      }.bind(this));
  }
  render() {
    return (
      <div className={style.PopularContainer}>

        {!this.state.repos ?  <Loading text="Loading" />:
        <Grid>

          <Row>
            {this.state.repos.map(function(repo,index){
              return (
                <Col key={index} md={2} sm={4}>
                  <a className={style.Card} href={repo.html_url}>
                    <Image src={repo.owner.avatar_url}   responsive circle />
                    <Button variant="primary" disabled={true}>
                      Stars <Badge variant="light">{repo.stargazers_count}</Badge>
                    </Button>
                    <h3>{repo.owner.login}</h3>

                  </a>
                </Col>
              )
            })}
          </Row>
        </Grid>

        }
      </div>
    );
  }
}


export default Popular;
