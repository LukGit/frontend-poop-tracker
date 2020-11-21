import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import Signup from './components/Signup'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path={'/signup'} component={Signup}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
