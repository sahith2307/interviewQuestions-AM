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
    selectedIndex: {},
    finished: false,
    score: 0,
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
    });
  };

  finishFunctionality = () => {
    const { getAnswers, testName, questions } = this.state;
    console.log(this.gettingAnswers);
    localStorage.setItem(testName, JSON.stringify(getAnswers));

    let storeScore = 0;
    for (let id in questions) {
      console.log(questions[id]._id);
    }
    this.setState({ score: storeScore, finished: true });
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
    const { questions, questionIndex, testName, finished, getAnswers, score } =
      this.state;

    return (
      <div className="test-container">
        <div>
          <h1>{testName}</h1>
        </div>
        {finished ? (
          <div className="qus-container">
            <div>
              <h1>Number Of Questions {questions.length}</h1>
              <h1>
                Correct Answers {score} Wrong Answers {questions.length - score}
              </h1>
            </div>
          </div>
        ) : (
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
              questionIndex
              questions
            />
          </div>
        )}
      </div>
    );
  }
}
export default TestSection;
