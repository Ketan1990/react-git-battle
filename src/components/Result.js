import React from 'react';
import PropTypes from 'prop-types';
import  queryString from 'query-string';
import api from '../service/api';
import {Link} from 'react-router-dom';
import UserPreview from './UserPreview';
import  Loading from './Loading';
import {Grid,Row,Col} from 'react-bootstrap';

function Profile (props) {
  var info = props.info;

  return (
    <UserPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </UserPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player (props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile} />
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
        <Loading/>
      )
    }
    return (
    <Grid>
      <Row>
        <Col md={6}>
          <Player label="winner" score={winner.score} profile={winner.profile}/>
        </Col>

        <Col md={6}>
          <Player label='loser' score={loser.score} profile={loser.profile}/>
        </Col>
      </Row>
    </Grid>
    )
  }
}

export default Result;
