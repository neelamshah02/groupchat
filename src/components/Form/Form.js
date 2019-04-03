import React, { Component } from "react";
import "./Form.css";
import Message from "../Message/Message";
import firebase from "firebase";
import Tabs from "../Tabs/Tabs";
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Kumar",
      message: "",
      list: []
    };
    this.messageRef = firebase
      .database()
      .ref()
      .child("messages");
    this.listenMessages();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({ userName: nextProps.user.displayName });
    }
  }
  handleChange(event) {
    this.setState({ message: event.target.value });
  }
  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message
      };
      this.messageRef.push(newItem);
      this.setState({ message: "" });
    }
  }
  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }
  listenMessages() {
    this.messageRef.limitToLast(10).on("value", message => {
      if (message.val()) {
        this.setState({
          list: Object.values(message.val())
        });
      }
    });
  }
  render() {
    let unique = [...new Set(this.state.list.map(x => x.userName))];

    return (
      <Tabs>
        <div label="Participants">
          {unique.map(i => (
            <li className="participants-list" key={i}>
              {i}
            </li>
          ))}
        </div>

        <div label="Chat">
          <div className="form">
            <div className="form-message">
              {this.state.list.map((item, index) => (
                <Message key={index} message={item} />
              ))}
            </div>
          </div>
          <div className="input-box">
            <input
              className="form-input"
              type="text"
              placeholder="Type message"
              value={this.state.message}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
          </div>
        </div>
      </Tabs>
    );
  }
}
