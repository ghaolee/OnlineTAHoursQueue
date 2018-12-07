import React, { Component } from 'react';

var bcrypt = require('bcryptjs');

class LogInControl extends Component {

  constructor() {
    super();
    this.state = {
      userInfo: []
    };
  }

  // fetchData() {
  //   fetch("https://randomuser.me/api/?results5&5nat=us,dk,fr,gb")
  //     .then(response => response.json())
  //     .then(parsedJSON => console.log(parsedJSON.results))
  //     .catch(error => console.log('parsing failed', error))
  // }

  handleLogin(e) {
    e.preventDefault();
    if (localStorage["users"] === null) {
      alert("Sign up first");
    } else {
      let userLogin = document.getElementById("username").value;
      let passLogin = document.getElementById("password").value;
      let users = JSON.parse(localStorage.getItem("users"));
      for (var i = 0; i < users.length; i++) {
        if (users[i][0].username === userLogin) {
          let checkPass = users[i][0].password;
          let passCorrect = bcrypt.compareSync(passLogin, checkPass);
          if (passCorrect) {
            this.props.onLogin(userLogin, users[i][0].role);
            break;
          } else {
            alert("Incorrect password");
            break;
          }
        }
      }
    }
  }

  handleSignin(e) {
    e.preventDefault();
    let newUser = document.getElementById("newUsername").value;
    let newPass = document.getElementById("newPassword").value;
    if (newUser === '') {
      alert("You need to input a username");
      return
    }
    var passRegex = new RegExp('^(?=.*\\d).{4,8}$');
    if (!passRegex.test(newPass)) {
      alert("Password must be between 4 and 8 digits long and include at least one numeric digit.");
      return
    }
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newPass, salt, function(err, hash) { 
        let userAccount = [{
          username: newUser,
          password: hash,
          role: "student"
        }];
        if (localStorage.getItem("users") === null) {
          let users = [];
          let adminAccount = [{
            username: "admin",
            password: "$2a$10$O/2b3w.Ql10DyFKlUq85x.H6TJE/h/tmCTRkFFxGqdu9WSUcQbPqO",
            role: "admin"
          }];
          users.push(adminAccount);
          users.push(userAccount);
          localStorage.setItem("users", JSON.stringify(users)); 
          alert("User created");
        } else {
          let users = JSON.parse(localStorage["users"]);
          users.push(userAccount);
          localStorage.setItem("users", JSON.stringify(users));
          alert("User created");
        }
      });
    });
  }

  render() {
    return (
      <div id="loginControl">
        <h3>Log In:</h3>
        <form onSubmit={this.handleLogin.bind(this)}>
          <div>
            <label>Username</label>
            <input type="text" id="username" placeholder="Username"></input>
          </div>
          <div>
            <label>Password</label>
            <input type="text" id="password" placeholder="Password"></input>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
          <br />
        </form>
        <h3>Sign Up:</h3>
        <form onSubmit={this.handleSignin.bind(this)}>
          <div>
            <label>Username</label>
            <input type="text" id="newUsername" placeholder="Username"></input>
          </div>
          <div>
            <label>Password</label>
            <input type="text" id="newPassword" placeholder="Password"></input>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
          <br />
        </form>
      </div>
    );
  }
}

export default LogInControl;