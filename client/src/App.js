import { useState } from "react";
import Navigation from "./components/Navigation";
import FilmPages from "./pages/FilmPages";
import Home from "./pages/Home";
import {BrowserRouter as Router, withRouter, Route, Switch} from 'react-router-dom'

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navigation/>
        <Switch>
          <Route exact path = "/" component = {Home}/>
          <Route path = "/movie/:id" component = {FilmPages}/>
          </Switch>
      </div>
    </Router>
    
  );
}

export default App;
