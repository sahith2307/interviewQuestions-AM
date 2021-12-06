import { Component } from "react";

import Question from "../Question";

import Data from "../data.json";

import "./index.css";

class TestSection extends Component {
  state = {
    data: Data,
    questions: [],
    testName: "",
    questionIndex: 0,
    getAnswers: {},
  };

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

  gettingAnswers = (value, correctValue, id) => {
    const valueput = {};
    valueput[id] = value === correctValue;
    this.setState(prev=>({ getAnswers: { ...prev.getAnswers,...valueput } }));
  };

  prevFunctionality = () => {
    const { questionIndex } = this.state;
    if (questionIndex <= 0) {
      this.setState({ questionIndex: 0 });
    } else {
      this.setState((perv) => ({ questionIndex: perv.questionIndex - 1 }));
    }
  };

  nextFunctionality = () => {
    const { questions, questionIndex } = this.state;
    console.log(questions.length);

    if (questionIndex >= questions.length - 1) {
      console.log(questionIndex);
      this.setState({ questionIndex: questions.length - 1 });
    } else {
      this.setState((perv) => ({ questionIndex: perv.questionIndex + 1 }));
    }
  };

  render() {
    const { questions, questionIndex, testName, getAnswers } = this.state;
    console.log(getAnswers);
    return (
      <div className="test-container">
        <div className="qus-container">
          <div>
            <h1>{testName}</h1>
          </div>
          <Question
            key={questions[questionIndex]}
            questionData={questions[questionIndex]}
            gettingAnswers={this.gettingAnswers}
          />
          <div className="button-cont">
            <button
              className="button-sizing"
              onClick={this.prevFunctionality}
              type="button"
            >
              Prev
            </button>
            <button
              className="button-sizing"
              type="button"
              onClick={this.nextFunctionality}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default TestSection;
