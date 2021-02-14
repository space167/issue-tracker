import React from "react";
import {Route, Switch} from "react-router-dom";
import 'fontsource-roboto';

import {Issue, Issues} from "./pages";
import "./App.sass";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/:organization/:repository/issues/:id" component={Issue}/>
        <Route path={["/", "issues/:page"]} component={Issues}/>
      </Switch>
    </div>
  );
}

export default App;
