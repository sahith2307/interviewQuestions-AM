import { Link } from "react-router-dom";

import "./index.css";

const Subject = (props) => {
  const { name, numberOfQus, id } = props;
  return (
    <>
      <hr />
      <li className="list-of-qus">
        <div className="arrange-cont">
          <h1>{name}</h1>
          <h1>{numberOfQus}</h1>
        </div>
        <Link to={`/test/${id}`}>
          <button type="button">Start</button>
        </Link>
      </li>
    </>
  );
};
export default Subject;
