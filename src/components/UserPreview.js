import React from 'react';
import { Image } from 'react-bootstrap';
//stateless function (Component)

function UserPreview(props) {
    return (
    <div >
      <Image src={props.avatar} responsive circle/>
      <h2>{props.username}</h2>
      {props.children}
    </div>
    );
}
export default UserPreview;
