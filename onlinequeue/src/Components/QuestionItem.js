import React, { Component } from 'react';

class QuestionItem extends Component {
  deleteProject(id) {
    this.props.onDelete(id);
  }

  render() {
    return (
      <li className="QuestionItem">
        <strong>{this.props.username}: {this.props.question.category}- </strong> {this.props.question.questionAsked} 
        <a href="#" onClick={this.deleteProject.bind(this, this.props.question.id)}>X</a>
      </li>
    );
  }
}

export default QuestionItem;