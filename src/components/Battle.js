import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Grid,Row,Col,Button} from 'react-bootstrap';
import UserForm from './UserForm';
import UserPreview from './UserPreview';
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
        <Grid>
          <Row className="show-grid">
            <Col md={6} sm={12}>
              { !playerOneName && <UserForm id= "playerOne" label="Player One" onSubmit={this.handleSubmit} /> }
              {  playerOneImage !== null &&
                <UserPreview
                  avatar={playerOneImage}
                  username={playerOneName}>
                  <Button bsStyle="link"
                    onClick={this.handleReset.bind(this, 'playerOne')}>
                    Reset
                  </Button>
                </UserPreview>
              }
            </Col>

            <Col md={6} sm={12}>
              { !playerTwoName && <UserForm id= "playerTwo" label="Player Two" onSubmit={this.handleSubmit} /> }
              {  playerTwoImage != null &&
                <UserPreview
                  avatar={playerTwoImage}
                  username={playerTwoName}>
                  <Button bsStyle="link"
                    onClick={this.handleReset.bind(this, 'playerTwo')}>
                    Reset
                  </Button>
                </UserPreview>
              }
            </Col>
          </Row>
          { playerOneImage && playerTwoImage && <Row>
            <Col>
              <Link
                className='button'
                to={{
                    pathname: match.url + '/results',
                    search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                }}>
                Battle
              </Link>
            </Col>
          </Row>}
        </Grid>

    );
  }
}

export default Battle;
