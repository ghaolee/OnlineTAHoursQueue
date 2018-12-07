import React, { Component } from 'react';
import uuid from 'uuid';

class AddQuestion extends Component {
  static defaultProps= {
    categories: ["Module 1", "Module 2", "Module 3", "Logistics", "Other"]
  }

  handleSubmit(e) {
    e.preventDefault();
    if (document.getElementById("questionName").value === '') {
      alert("Question required");
    } else {
      this.setState({newQuestion:{
        id: uuid.v4(),
        questionAsked: document.getElementById("questionName").value,
        category: document.getElementById("category").value,
        username: document.getElementById("loggedIn").innerHTML
      }}, function() {
        this.props.addQuestion(this.state.newQuestion);
      });
    }
  }

  render() {
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    });
    return (
      <div>
        <h3>Add Question</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Question</label>
            <input type="text" id="questionName"></input>
          </div>
          <div>
            <label>Category</label>
            <select id="category">{categoryOptions}</select>
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

export default AddQuestion;