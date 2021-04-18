import { useState } from "react";
import Navigation from "./components/Navigation";
import FilmPages from "./pages/FilmPages";
import Home from "./pages/Home";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navigation/>
        <Route exact path = "/" component = {Home}/>
        <Route path = "/movie/:id" component = {FilmPages}/>
      </div>
    </Router>
    
  );
}

export default App;
