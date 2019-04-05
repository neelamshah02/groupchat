import React, {Component} from 'react';
import './Message.css';
export default class Message extends Component {
  render() {
    return (
      <div className="message">
                <div className="message__author">
                    {this.props.message.userName}
                </div>
              
        <div>{this.props.message.message} <span className="delete" name={this.props.message.userName} id={this.props.message.id} data-index={this.props.index} onClick={this.props.deleteMessage}>X</span></div>
      </div>
    )
  }
}