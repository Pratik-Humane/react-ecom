import { Route, Switch } from 'react-router-dom';
import './default.scss';
import HomePageLayout from './Layout/HomePageLayout';
import MainLayout from './Layout/MainLayout';
import HomePage from './pages/HomePage';
import Registration from './pages/Registration';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
            <HomePageLayout>
              <HomePage />
            </HomePageLayout>
          )}/>
        <Route path="/registration" render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}/>
      </Switch>
    </div>
  );
}

export default App;
