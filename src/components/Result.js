import React from 'react';
import PropTypes from 'prop-types';
import  queryString from 'query-string';
import api from '../service/api';
import UserPreview from './UserPreview';
import  Loading from './Loading';
import {Grid,Row,Col,Badge} from 'react-bootstrap';
import {Link} from "react-router-dom";
import style from './Result.scss';

function Profile (props) {
  var info = props.info;

  return (
    <UserPreview username={info.login} avatar={info.avatar_url}>
      <ul className='list-group'>
        <li className='list-group-item'><strong>Name: </strong> {info.name}</li>
        <li className='list-group-item'><strong>Location: </strong> {info.location}</li>
        <li className='list-group-item'><strong>Company: </strong> {info.company}</li>
        <li className='list-group-item'><strong>Followers: </strong>  <Badge variant="success">{info.followers}</Badge></li>
        <li className='list-group-item'><strong>Following: </strong><Badge variant="warning"> {info.following}</Badge></li>
        <li className='list-group-item'><strong>Public Repos:</strong><Badge variant="danger"> {info.public_repos}</Badge></li>
        <li className='list-group-item'><strong>Blog:</strong><a href={info.blog}>{info.blog}</a></li>
      </ul>

    </UserPreview>
      )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player (props) {
  const label = props.label
  return (
    <div className={label}>
      <ul className="list-group">
        <li className="list-group-item active"><h1>{props.label}</h1></li>
        <li className="list-group-item"><h3 style={{textAlign: 'center'}}>Score: <Badge variant="primary">{props.score}</Badge></h3></li>
        <li><Profile info={props.profile} /></li>
      </ul>
      </div>

  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: {},
      loser: {},
      error: null,
      loading: true,
    }
  }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    api.battle([players.playerOneName,players.playerTwoName])
    .then(function(data){
      if(data === null){
         this.setState(() => ({
              error: 'Looks like there was an error. Check that both users exist on Github.',
              loading: false,
        }));
          return false;
      }
       this.setState({
        error: null,
        winner:data[0],
        loser: data[1],
        loading: false,
      })
    }.bind(this))
  }

  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if(loading){
      return (
        <Loading text="Loading"/>
      )
    }
    if(error){
      return(
        <div className="alert alert-danger">
          <div>{error}</div>
          <Link to='/battle'>Back</Link>
        </div>
      )
    }
    return (
      <div className={style.Result}>
        <Grid>
          <Row>
            <Col md={6}>
              <Player label="Winner" score={winner.score} profile={winner.profile}/>
            </Col>
            <Col md={6}>
              <Player label='Loser' score={loser.score} profile={loser.profile}/>
            </Col>
          </Row>

        </Grid>
      </div>
    )
  }
}

export default Result;
