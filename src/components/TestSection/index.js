import { Component } from "react";

import Question from "../Question";

import Data from "../data.json";

import Header from "../Header";

import "./index.css";

class TestSection extends Component {
  state = {
    data: Data,
    questions: [],
    paramsId: "",
    testName: "",
    questionIndex: 0,
    getAnswers: {},
  };

  componentWillMount() {
    this.setQuestions();
  }

  componentDidMount() {
    this.setState({
      getAnswers: JSON.parse(localStorage.getItem(this.state.testName)),
    });
  }

  setQuestions = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { data } = this.state;
    const dataTaken = data.tests.filter((each) => each._id === id);
    this.setState({
      questions: dataTaken[0].questions,
      testName: dataTaken[0].name,
      paramsId: id,
    });
  };

  finishFunctionality = () => {
    const { getAnswers, testName } = this.state;
    localStorage.setItem(testName, JSON.stringify(getAnswers));
  };

  gettingAnswers = (value, correctValue, id) => {
    const valueput = {};
    const indexes = {};

    indexes[id] = value;

    valueput[id] = value;
    this.setState((prev) => ({
      getAnswers: { ...prev.getAnswers, ...valueput },
    }));
  };

  prevFunctionality = () => {
    const { questionIndex, testName, getAnswers } = this.state;

    if (questionIndex <= 0) {
      this.setState({ questionIndex: 0 });
    } else {
      this.setState((perv) => ({ questionIndex: perv.questionIndex - 1 }));
    }
    localStorage.setItem(testName, JSON.stringify(getAnswers));
  };

  nextFunctionality = () => {
    const { questions, questionIndex, testName, getAnswers } = this.state;
    console.log();
    localStorage.setItem(testName, JSON.stringify(getAnswers));
    if (questionIndex >= questions.length - 1) {
      this.setState({ questionIndex: questions.length - 1 });
    } else {
      this.setState((perv) => ({ questionIndex: perv.questionIndex + 1 }));
    }
  };

  render() {
    const { questions, questionIndex, testName, getAnswers, paramsId } =
      this.state;

    return (
      <div className="test-container">
        <Header />
        <div className="finishes-container">
          <div className="testName-container">
            <h1>{testName}</h1>
          </div>
          <div className="qus-container">
            <Question
              testName={testName}
              key={questions[questionIndex]}
              questionData={questions[questionIndex]}
              gettingAnswers={this.gettingAnswers}
              getAnswers={getAnswers}
              nextFunctionality={this.nextFunctionality}
              prevFunctionality={this.prevFunctionality}
              finishFunctionality={this.finishFunctionality}
              questionIndex={questionIndex}
              questions={questions}
              paramsId={paramsId}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default TestSection;
