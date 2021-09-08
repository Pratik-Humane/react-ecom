import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './default.scss';
import { auth, handleUserProfile } from './firebase/util';
import { setCurrentUser } from "./redux/User/user.actions";
import HomePageLayout from './Layout/HomePageLayout';
import MainLayout from './Layout/MainLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Registration from './pages/Registration';

class App extends Component {
  
  authListner = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.authListner = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const useRef = await handleUserProfile(userAuth);
        useRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data
          })
        })
      }
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.authListner();
  }

  render() {

    const { currentUser } = this.props;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
              <HomePageLayout>
                <HomePage />
              </HomePageLayout>
            )}/>
          <Route path="/registration"
            render={() => currentUser ? <Redirect to="/"/> : (
              <MainLayout>
                <Registration />
              </MainLayout>
            )}/>
          <Route path="/login"
            render={() => currentUser ? <Redirect to="/"/> : (
              <MainLayout>
                <Login />
              </MainLayout>
            )}/>
          <Route path="/recovery"
            render={() => currentUser ? <Redirect to="/"/> : (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}/>
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
