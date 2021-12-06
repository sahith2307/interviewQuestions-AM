import { Component } from "react";
import "./index.css";

class Question extends Component {
  state = { a: [] };
  pushData = (event) => {
    const { a } = this.state;
    const { questionData, gettingAnswers } = this.props;
    const numberedValue = Number(event.target.value);

    console.log(a, questionData.correctOptionIndex);
    if (event.target.checked) {
      this.setState((prev) => ({ a: [...prev.a, numberedValue] }));

      gettingAnswers(
        JSON.stringify([...a, numberedValue].sort()),
        JSON.stringify(questionData.correctOptionIndex),
        questionData._id
      );
    } else {
      const indexFind = a.indexOf(numberedValue);
      this.setState((prev) => ({ a: prev.a.splice(indexFind, 1) }));
      a.splice(indexFind, 1);
      gettingAnswers(
        JSON.stringify(a.sort()),
        JSON.stringify(questionData.correctOptionIndex),
        questionData._id
      );
    }
  };

  getAns = (event) => {
    const { questionData, gettingAnswers } = this.props;
    gettingAnswers(
      Number(event.target.value),
      questionData.correctOptionIndex,
      questionData._id
    );
  };

  render() {
    const { questionData } = this.props;
    const { questionText, type, options } = questionData;
    const typeOfInput = type ? "checkbox" : "radio";
    const functionaldata = type ? this.pushData : this.getAns;
    return (
      <>
        <h1>{questionText}</h1>
        <ul className="un-ordered-options">
          {options.map((each) => (
            <li>
              <input
                key={each + 1}
                id={each}
                name="ll"
                type={typeOfInput}
                value={options.indexOf(each)}
                onChange={functionaldata}
              />
              <label htmlFor={each}>{each}</label>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
export default Question;
