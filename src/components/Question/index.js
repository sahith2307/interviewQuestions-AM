import { Component } from "react";

import { AiOutlineCaretLeft, AiFillCaretRight } from "react-icons/ai";
import "./index.css";

class Question extends Component {
  state = { a: [], radioQuestionValue: null, getLocal: null };

  componentWillMount() {
    const { testName } = this.props;
    const localAnswers = JSON.parse(localStorage.getItem(testName));
    this.setState({
      getLocal: localAnswers,
      //a: questionData.type ? [...changedOptions] : changedOptions,
      a: [],
    });
  }

  pushData = (event) => {
    const { a } = this.state;
    const { questionData, gettingAnswers } = this.props;
    const numberedValue = Number(event.target.value);
    const l = {};

    if (event.target.checked) {
      l[questionData._id] = [...a, numberedValue];
      this.setState((prev) => ({
        a: [...prev.a, numberedValue],
        getLocal: { ...prev.getLocal, ...l },
      }));

      gettingAnswers(
        [...a, numberedValue].sort(),
        JSON.stringify(questionData.correctOptionIndex),
        questionData._id,
        questionData
      );
    } else {
      const indexFind = a.indexOf(numberedValue);
      a.splice(indexFind, 1);
      l[questionData._id] = a;
      this.setState((prev) => ({ a: a, getLocal: { ...prev.getLocal, ...l } }));
      gettingAnswers(
        a.sort(),
        JSON.stringify(questionData.correctOptionIndex),
        questionData._id,
        questionData
      );
    }
  };

  getAns = (event) => {
    const { questionData, gettingAnswers } = this.props;
    const l = {};
    gettingAnswers(
      Number(event.target.value),
      questionData.correctOptionIndex,
      questionData._id
    );
    l[questionData._id] = Number(event.target.value);
    this.setState((prev) => ({
      a: null,
      getLocal: { ...prev.getLocal, ...l },
    }));
  };

  nextFunction = async () => {
    const { nextFunctionality } = this.props;
    await nextFunctionality();
    const { testName, questionData } = this.props;
    const localAnswers = JSON.parse(localStorage.getItem(testName));
    const getOption =
      localAnswers === null || undefined ? [] : localAnswers[questionData._id];
    const changedOptions = getOption === undefined ? [] : getOption;
    this.setState({
      getLocal: localAnswers,
      a: questionData.type ? [...changedOptions] : changedOptions,
    });
  };

  prevFunction = async () => {
    const { prevFunctionality } = this.props;
    await prevFunctionality();
    const { testName, questionData } = this.props;
    const localAnswers = JSON.parse(localStorage.getItem(testName));
    const getOption =
      localAnswers === null || undefined ? [] : localAnswers[questionData._id];
    const changedOptions = getOption === undefined ? [] : getOption;
    this.setState({
      getLocal: localAnswers,
      a: questionData.type ? [...changedOptions] : changedOptions,
    });
  };

  finishFunction = async () => {
    const { finishFunctionality } = this.props;
    await finishFunctionality();
    const { testName, questionData } = this.props;
    const localAnswers = JSON.parse(localStorage.getItem(testName));
    const getOption =
      localAnswers === null || undefined ? [] : localAnswers[questionData._id];
    const changedOptions = getOption === undefined || [] ? [] : getOption;
    this.setState({
      getLocal: localAnswers,
      a: questionData.type ? [...changedOptions] : changedOptions,
    });
  };

  componentDidMount() {
    const { testName, questionData } = this.props;
    const localAnswers = JSON.parse(localStorage.getItem(testName));
    const getOption =
      localAnswers === null || undefined ? [] : localAnswers[questionData._id];
    const changedOptions = getOption === undefined ? [] : getOption;
    this.setState({
      getLocal: localAnswers,
      a: questionData.type ? [...changedOptions] : changedOptions,
    });
  }

  render() {
    const { questionData, questionIndex, questions } = this.props;
    const { questionText, type, options } = questionData;
    const { a, getLocal } = this.state;
    const typeOfInput = type ? "checkbox" : "radio";
    const functionaldata = type ? this.pushData : this.getAns;
    const dontPrev = questionIndex === 0 ? "not-display" : null;
    const dontNext =
      questionIndex === questions.length - 1 ? "not-display" : null;
    const getOption = a === null || undefined ? [] : getLocal[questionData._id];
    const changedOptions = getOption === undefined ? [] : getOption;
    return (
      <>
        <h1>{questionText}</h1>
        <ul className="un-ordered-options">
          {options.map((each) => {
            const checkedValue = type
              ? changedOptions.includes(options.indexOf(each))
              : options.indexOf(each) === changedOptions;
            return (
              <li>
                <input
                  key={each + 1}
                  id={each}
                  name="ll"
                  checked={checkedValue ? true : null}
                  type={typeOfInput}
                  value={options.indexOf(each)}
                  onChange={functionaldata}
                />
                <label htmlFor={each}>{each}</label>
              </li>
            );
          })}
        </ul>
        <div className="button-cont">
          <button
            className={`button-sizing ${dontPrev}`}
            onClick={this.prevFunction}
            type="button"
          >
            <AiOutlineCaretLeft />
          </button>
          <button
            className={`button-sizing ${dontNext}`}
            type="button"
            onClick={this.nextFunction}
          >
            <AiFillCaretRight />
          </button>
          <button
            type="button"
            className={`button-sizing `}
            onClick={this.finishFunction}
          >
            Finish
          </button>
        </div>
      </>
    );
  }
}
export default Question;
