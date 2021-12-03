import "./index.css";

const Question = (props) => {
  const { questionData } = props;
  const { questionText, type, options } = questionData;
  const typeOfInput = type ? "checkbox" : "radio";
  console.log(typeOfInput);
  return (
    <>
      <h1>{questionText}</h1>
      <ul className="un-ordered-options">
        {options.map((each) => (
          <li>
            <input
              id={each}
              name="ll"
              type={typeOfInput}
              value={options.indexOf(each)}
            />
            <label htmlFor={each}>{each}</label>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Question;
