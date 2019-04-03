import React, {Component} from 'react';
import './Message.css';
export default class Message extends Component {
  render() {
    return (
      <div className="message">
                <div className="message__author">
                    {this.props.message.userName}
                </div>
        {this.props.message.message}
      </div>
    )
  }
}