import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Grid,Row,Col,Button, Jumbotron} from 'react-bootstrap';
import UserForm from './UserForm';
import UserPreview from './UserPreview';
import style from './Battle.scss';

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerTwoName: '',
      playerOneName: '',
      playerTwoImage: null,
      playerOneImage: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit(id, username) {
    let newState = {};
    newState[id + 'Name'] = username;
    newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
    this.setState( () => {
      return newState;
    });
  }

  handleReset(id){
    let newState = {};
    newState[id + 'Name'] = '';
    newState[id + 'Image'] = null;
    this.setState(() => {
      return newState;
    });
  }


  render() {
    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoName = this.state.playerTwoName;
    let playerTwoImage = this.state.playerTwoImage;
    return (
        <div className={style.BattleContainer}>
          <Grid>
            <Row>
              <Col md={6} sm={12}>
                <Jumbotron>
                  { !playerOneName && <UserForm id= "playerOne" label="Player One" onSubmit={this.handleSubmit} /> }
                  {  playerOneImage !== null &&
                    <UserPreview
                      avatar={playerOneImage}
                      username={playerOneName}>
                      <Button bsStyle="info"
                        onClick={this.handleReset.bind(this, 'playerOne')}>
                        Reset Me
                      </Button>
                    </UserPreview>
                  }</Jumbotron>
              </Col>

              <Col md={6} sm={12}>
                <Jumbotron>
                  { !playerTwoName && <UserForm id= "playerTwo" label="Player Two" onSubmit={this.handleSubmit} /> }
                  {  playerTwoImage != null &&
                    <UserPreview
                      avatar={playerTwoImage}
                      username={playerTwoName}>
                      <Button bsStyle="info"
                        onClick={this.handleReset.bind(this, 'playerTwo')}>
                        Reset Me
                      </Button>
                    </UserPreview>
                  }
                </Jumbotron>
              </Col>
            </Row>
            { playerOneImage && playerTwoImage && <Row>
              <Col>
                <Button  size="lg" >
                  <Link

                    to={{
                        pathname: match.url + '/results',
                        search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                    }}>
                    Battle
                  </Link>
                </Button>
              </Col>
            </Row>}
          </Grid>

        </div>
    );
  }
}

export default Battle;
