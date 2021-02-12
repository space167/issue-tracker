import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import 'fontsource-roboto';
import {Issue, Issues} from "./pages";

import "./App.sass";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/issue/:id" component={Issue}/>
          <Route path={["/", "issues/:page"]} component={Issues}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
