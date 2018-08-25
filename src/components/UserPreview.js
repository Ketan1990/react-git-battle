import React from 'react';
import { Image } from 'react-bootstrap';
import style from './UserForm.scss'
//stateless function (Component)

function UserPreview(props) {
    return (
    <div className={style.UserPreview}>
      <h2>{props.username}</h2>
      <Image src={props.avatar} responsive circle/>

      {props.children}
    </div>
    );
}
export default UserPreview;
