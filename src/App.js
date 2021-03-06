import './App.css';
import {BrowserRouter} from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import ReportForm from './components/ReportForm'
import Reports from './components/Reports'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path={'/login'} component={Login} />
        <Route path={'/signup'} component={Signup}/>
        <Route path={'/reports/new'} component={ReportForm} />
        <Route path={'/reports'} component={Reports} />
        <Route path={'/'} component={Login} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
