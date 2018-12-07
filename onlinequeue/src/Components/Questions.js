import React, { Component } from 'react';
import QuestionItem from './QuestionItem';

class Questions extends Component {
  deleteProject(id) {
    this.props.onDelete(id);
  }

  render() {
    let questionItems;
    if (this.props.questions) {
      questionItems = this.props.questions.map(question => {
        return(
          <QuestionItem key={question.questionAsked} username={question.username} question={question} onDelete={this.deleteProject.bind(this)} />
        );
      });
    }
    return (
      <div className="Questions">
        {questionItems}
      </div>
    );
  }
}

export default Questions;