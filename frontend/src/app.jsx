import { Route, Switch } from 'wouter'; 
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useEffect } from 'preact/hooks'; 
import { initializeTheme } from './utils/ThemeLogic'; 
import TopBar from './components/TopBar';
import FirstPage from './layouts/FirstPage';
import LoginPage from './layouts/LoginPage';
import Registration1Page from "./layouts/Registration1Page";
import Registration2Page from "./layouts/Registration2Page";
import UserHomePage from './layouts/UserHomePage';
import Discover1Page from './layouts/Discover1Page';
import Discover2Page from './layouts/Discover2Page';
import InfoPage from './layouts/InfoPage';
import ContinueRoutine from './layouts/ContinueRoutine';
import PendingUsers from './layouts/PendingUsers';
import ManageUsers from './layouts/ManageUsers';
import NotSoFast from './layouts/NotSoFast';



function App() {
  // Initialize theme globally when the app loads
  useEffect(() => {
    initializeTheme(); 
  }, []); 

  return (
    <div>
      <TopBar />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={500}
          classNames="fade"
        >
          <Switch>
            <Route path="/" component={FirstPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register1" component={Registration1Page} />
            <Route path="/register2" component={Registration2Page} />
            <Route path="/user-home" component={UserHomePage} />
            <Route path="/discover1" component={Discover1Page} />
            <Route path="/discover2" component={Discover2Page} />
            <Route path="/my-info" component={InfoPage} />
            <Route path="/routine" component={ContinueRoutine} />
            <Route path="/PendingUsers" component={PendingUsers} />
            <Route path="/ManageUsers" component = {ManageUsers} />
            <Route path="/NotSoFast" component = {NotSoFast} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
