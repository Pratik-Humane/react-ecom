import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './default.scss';
import { auth, handleUserProfile } from './firebase/util';
import HomePageLayout from './Layout/HomePageLayout';
import MainLayout from './Layout/MainLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Registration from './pages/Registration';


const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }
  
  authListner = null;
  componentDidMount() {
    this.authListner = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const useRef = await handleUserProfile(userAuth);
        useRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      this.setState({
        ...initialState
      })
    })
  }

  componentWillUnmount() {
    this.authListner();
  }

  render() {

    const { currentUser } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
              <HomePageLayout currentUser={currentUser}>
                <HomePage />
              </HomePageLayout>
            )}/>
          <Route path="/registration"
            render={() => currentUser ? <Redirect to="/"/> : (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )}/>
          <Route path="/login"
            render={() => currentUser ? <Redirect to="/"/> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )}/>
          <Route path="/recovery"
            render={() => currentUser ? <Redirect to="/"/> : (
              <MainLayout currentUser={currentUser}>
                <Recovery />
              </MainLayout>
            )}/>
        </Switch>
      </div>
    );
  }
  
}

export default App;
