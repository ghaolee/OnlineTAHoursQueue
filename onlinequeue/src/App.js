import React, { Component } from 'react';
import uuid from 'uuid';
import Questions from './Components/Questions';
import AddQuestion from './Components/AddQuestion'
import LogInControl from './Components/LogInControl'
import TAInfo from './Components/TAInfo';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questionList: [],
      loggedIn: false,
      role: "student",
      username: null
    }
  }

  componentWillMount() {
    this.setState({questionList:[
      {
        id: uuid.v4(),
        questionAsked: "How to make boolean?",
        category: "Module 1",
        username: "admin"
      }
    ]});
  }

  handleAddProject(question) {
    let questions = this.state.questionList;
    questions.push(question);
    if (localStorage.getItem("questions") === null) {
      localStorage.setItem("questions", JSON.stringify(questions));
      this.setState({questionList: questions});
    }
    else {
      let storageQuestions = JSON.parse(localStorage.getItem("questions"));
      storageQuestions.push(question);
      localStorage.setItem("questions", JSON.stringify(storageQuestions));
      this.setState({questionList: storageQuestions});
    }
  }

  handleDeleteProject(id) {
    let questions = JSON.parse(localStorage.getItem("questions"));
    let index = questions.findIndex(a => a.id === id);
    questions.splice(index, 1);
    this.setState({questionList: questions});
    localStorage.setItem("questions", JSON.stringify(questions));
  }

  handleLogin(username, role) {
    this.setState({role: role});
    this.setState({loggedIn: true});
    this.setState({username: username});
    document.getElementById("loggedIn").innerHTML = username;
    let storageQuestions = JSON.parse(localStorage.getItem("questions"));
    this.setState({questionList: storageQuestions});
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({loggedIn: false});
    this.setState({role: "Student"});
    this.setState({username: null});
    document.getElementById("loggedIn").innerHTML = '';
  }

  handleLineOrder(e) {
    e.preventDefault();
    let questions = this.state.questionList;
    let username = document.getElementById("loggedIn").innerHTML;
    let index = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].username === username) {
        index = i;
        alert("You are person number " + (index+1) + " in line and it will take approximately " + (index+1)*5 + " minutes");
        break;
      }
    }
  }
  
  handleReviews(e) {
    e.preventDefault();
    let review = document.getElementById("review").value;
    let reviewList = document.getElementById("reviewList");
    reviewList.appendChild(document.createTextNode(review));
  }

  render() {

    return (
      <div className="OnlineQueue">
        <div>
          Logged in:
          <p id="loggedIn"></p>
          {this.state.loggedIn ?
            <form onSubmit={this.handleLogout.bind(this)}>
              <input type="submit" value="Log Out"></input>
            </form> : null}
        </div>
        {this.state.loggedIn ? <AddQuestion addQuestion={this.handleAddProject.bind(this)} /> : <LogInControl onLogin={this.handleLogin.bind(this) } />}
        <br /><br />
        Current Queue:
        <Questions logIn={this.state.loggedIn} questions={this.state.questionList} onDelete={this.handleDeleteProject.bind(this)} />

        {this.state.loggedIn ? <div>
          <br/>
          <form onSubmit={this.handleLineOrder.bind(this)}>
            <label htmlFor="getOrder">Get your order and wait time in line:</label>
            <p id="orderInLine"></p>
            <input type="submit" id="getOrder" />
          </form>
        </div> : null}
          <br /> <br /> <br />
          <form onSubmit={this.handleReviews.bind(this)}>
            <label htmlFor="review">Reviews:</label>
            <input type="text" id="review" />
            <input type="submit" value="submit" />
          </form>
          <div id="reviewList"></div>

        <TAInfo />
      </div>
    );
  }
}

export default App;