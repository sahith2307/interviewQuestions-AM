import { Component } from "react";

import Data from "../data.json";

import Subject from "../Subject";
import Header from "../Header";

import "./index.css";

class ExamSection extends Component {
  state = { tests: Data.tests };
  listOfTests = () => {
    const { tests } = this.state;
    return tests.map((each) => (
      <Subject
        key={each._id}
        id={each._id}
        name={each.name}
        numberOfQus={each.questions.length}
      />
    ));
  };
  render() {
    localStorage.setItem("AngularJS Test", JSON.stringify({}));
    localStorage.setItem("Javascript Test", JSON.stringify({}));
    localStorage.setItem("NodeJS Test", JSON.stringify({}));
    return (
      <div className="main-container">
        <Header />
        <ul className="un-ordered-lists">
          <li className="list-of-qus">
            <h1 className="heading-lists">Test</h1>
            <h1 className="heading-lists">Number Of Questions</h1>
            <div></div>
          </li>
          {this.listOfTests()}
        </ul>
        <span className="api">
          API Url:
          <a href=" http://interviewapi.stagging.in/getQuizData">
            http://interviewapi.stagging.in/getQuizData
          </a>
        </span>
      </div>
    );
  }
}
export default ExamSection;
