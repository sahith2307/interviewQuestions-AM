import { Component } from "react";
import Data from "../data.json";
import Header from "../Header";
import { AiFillHome } from "react-icons/ai";
import "./index.css";
import { Link } from "react-router-dom";
class Finish extends Component {
  state = { testId: "", totalQus: 0, testName: "", totalScore: 0 };
  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const questionsOfExam = Data.tests.filter((each) => each._id === id)[0]
      .questions;

    const testName = Data.tests.filter((each) => each._id === id)[0].name;
    const storedValues = JSON.parse(localStorage.getItem(testName));
    let score = 0;
    for (let id in storedValues) {
      const dataQus = questionsOfExam.filter((each) => each._id === id)[0]
        ? questionsOfExam.filter((each) => each._id === id)[0]
        : [];
      if ("" + dataQus.correctOptionIndex === "" + storedValues[id]) {
        score += 1;
      }
    }
    this.setState({
      testId: id,
      totalQus: questionsOfExam.length,
      totalScore: score,
      testName: testName,
    });
  }
  render() {
    const { totalQus, totalScore, testName } = this.state;
    return (
      <div className="test-container">
        <Header />
        <div className="finish-container">
          <div className="testName-container">
            <h1>{testName}-results</h1>
            <Link to="/">
              <AiFillHome className="icon" />
            </Link>
          </div>
          <div className="qua-container">
            <div>
              <h1>Total Number Of Questions {totalQus}</h1>
              <h1>
                Correct Answers {totalScore} Wrong Answers{" "}
                {totalQus - totalScore}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Finish;
