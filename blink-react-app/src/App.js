import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DrugInfo from './components/DrugInfo';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}  />
          <Route path='/drugs/search' exact component={Home}  />
          <Route path='/drugs/:drugName' exact component={DrugInfo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
