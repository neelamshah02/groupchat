import React, { Component } from "react";
import "./Form.css";
import Message from "../Message/Message";
import firebase from "firebase";
import Tabs from "../Tabs/Tabs";
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Neelam",
      message: "",
      id:"",
      list: []
    };
    this.messageRef = firebase
      .database()
      .ref("/messages");
    this.messages();
   
    
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
        message: this.state.message,
        id:Date.now().toString()
      };
      this.messageRef.push(newItem);
      this.setState({ message: "" });
    }
  }
  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }
  messages() {
    this.messageRef.limitToLast(10).on("value", message => {
     
      if (message.val()) {
        this.setState({
          list: Object.values(message.val()),
          messageIds : Object.keys(message.val()),
        });
      }
    });
  }
  deleteMessage(e){
     var list = this.state.list;
     if(this.state.userName === e.target.getAttribute('name')){
        let newList =list.filter((user, index) =>  {
          return user.id !== e.target.getAttribute('id')     
        })
        this.setState({list:newList})
        this.messageRef.child(e.target.getAttribute('data-index')).remove().then((res) => {
          alert(this.state.userName + " has deleted his message")
        })
      }else{
        alert("you cant delete this message")
      }
     
  }
  render() {
    let unique = [...new Set(this.state.list.map(x => x.userName))];

    return (
      <Tabs>
        <div label="Participants" counts={unique.length}>
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
                <Message key={this.state.messageIds[index]} index={this.state.messageIds[index]} message={item} deleteMessage={this.deleteMessage.bind(this)}/>
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
