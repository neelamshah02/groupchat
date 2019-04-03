import React, { Component } from 'react';
import './App.css';
import Form from './components/Form/Form.js';
import firebase from 'firebase';
import firebaseConfig from './config';


firebase.initializeApp(firebaseConfig);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    }
  }
 
  render() {
    return (
      <div className="app">
        <div className="app-header">
        Status meeting standup
        </div>
        <div className="app-list">
        
      <Form user={this.state.user} />      
      
        </div>
    
      </div>
    );
  }
}
export default App;
