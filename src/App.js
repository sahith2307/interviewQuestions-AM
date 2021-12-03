import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExamSection from "./components/ExamSection/index.js";
import TestSection from "./components/TestSection/index.js";
import "./App.css";
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ExamSection} />
      <Route exact path="/test/:id" component={TestSection} />
    </Switch>
  </BrowserRouter>
);
export default App;
