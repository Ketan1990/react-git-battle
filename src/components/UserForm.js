import React, { Component } from 'react';
import { FormGroup,
    FormControl,
    ControlLabel,
    Button, Form } from 'react-bootstrap';
import style from './UserForm.scss';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({username:value});
  }
  handleSubmit(e) {
    e.preventDefault();
    const id = this.props.id;
    const username =this.state.username;
    this.props.onSubmit(id,username);
  }
  render() {
    return (
      <Form className={style.Form} onSubmit={this.handleSubmit}>
        <FormGroup controlId="formBasicText" >
          <ControlLabel htmlFor='formBasicText'>{this.props.label}</ControlLabel>
          <FormControl
            placeholder='github username'
            type='text'
            value={this.state.username}
            autoComplete='off'
            onChange={this.handleChange}
          />

        </FormGroup>
        <Button
          variant="info"
          type='submit'
          disabled={!this.state.username}>
          Submit
        </Button>
      </Form>
    );
  }
}
export default UserForm;
