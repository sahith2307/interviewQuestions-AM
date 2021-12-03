import { Component } from "react";

import Data from "../data.json";

import Subject from "../Subject";

import "./index.css";

class ExamSection extends Component {
  state = { tests: Data.tests, angualrJs: [] };
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
    return (
      <div className="main-container">
        <ul className="un-ordered-lists">
          <li>
            <div className="arrange-head-cont">
              <h1>name</h1>
              <h1>Number Of Questions</h1>
            </div>
          </li>
          {this.listOfTests()}
        </ul>
      </div>
    );
  }
}
export default ExamSection;
