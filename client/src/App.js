import Navigation from "./components/Navigation";
import FilmPages from "./pages/FilmPages";
import Home from "./pages/Home";
import Login from "./pages/Login"
import {BrowserRouter as Router, withRouter, Route, Switch} from 'react-router-dom'
import ProfilPage from "./pages/ProfilPage";

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navigation/>
        <Switch>
          <Route exact path = "/" component = {Home}/>
          <Route path = "/movie/:id" component = {FilmPages}/>
          <Route exact path = "/login" component = {Login}/>
          <Route exact path = "/userPage" component = {ProfilPage}/>
          </Switch>
      </div>
    </Router>
    
  );
}

export default App;
