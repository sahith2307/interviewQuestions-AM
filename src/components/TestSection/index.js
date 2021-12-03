import { Component } from "react";

import Question from "../Question";

import Data from "../data.json";

import "./index.css";

class TestSection extends Component {
  state = { data: Data, questions: [], testName: "", questionIndex: 0 };

  componentWillMount() {
    this.setQuestions();
  }

  setQuestions = () => {
    console.log(this.props);
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { data } = this.state;
    const dataTaken = data.tests.filter((each) => each._id === id);
    console.log(dataTaken[0].questions);
    this.setState({
      questions: dataTaken[0].questions,
      testName: dataTaken[0].name,
    });
  };

  prevFunctionality = () => {
    const { questions, questionIndex } = this.state;
    console.log(questions[questionIndex - 1]);
    this.setState((perv) => ({ questionIndex: perv.questionIndex - 1 }));
  };

  nextFunctionality = () => {
    const { questions, questionIndex } = this.state;
    console.log(questions[questionIndex + 1].questionText);
    this.setState((perv) => ({ questionIndex: perv.questionIndex + 1 }));
  };

  render() {
    const { questions, questionIndex, testName } = this.state;
    return (
      <div className="test-container">
        <div className="qus-container">
          <div>
            <h1>{testName}</h1>
          </div>
          <Question questionData={questions[questionIndex]} />
          <div>
            <button onClick={this.prevFunctionality} type="button">
              Prev
            </button>
            <button type="button" onClick={this.nextFunctionality}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default TestSection;
