import React, { Component } from 'react';

class TAInfo extends Component {

  handleTAsHelping(e) {
    e.preventDefault();
    document.getElementById("taHelping").innerHTML = document.getElementById("tasHelping").value;
  }

  handleNextSession(e) {
    e.preventDefault();
    document.getElementById("nextTaSession").innerHTML = document.getElementById("nextSession").value;
  }

  render() {
    return (
      <div>
        <br/><br/><br/>
        <label htmlFor="taHelping">Available TAs: </label>
        <p id="taHelping">
          John Smith, Steven Bright, Chi Chi Lee
        </p>
        <form onSubmit={this.handleTAsHelping.bind(this)}>
          <input type="text" id="tasHelping" placeholder="Which TAs are available?"></input>
          <input type="submit" value="Submit"></input>
        </form> <br />
        <label htmlFor="nextTaSession">Next TA Session: </label>
        <p id="nextTaSession">
          June 21st: 5pm-8pm  @Urbauer 224
        </p>
        <form onSubmit={this.handleNextSession.bind(this)}>
          <input type="text" id="nextSession" placeholder="Whens the next session?"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default TAInfo;