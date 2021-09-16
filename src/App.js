import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./default.scss";
import { auth, handleUserProfile } from "./firebase/util";
import HomePageLayout from "./Layout/HomePageLayout";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import WithAuth from "./hoc/withAuth";
import { setCurrentUser } from "./redux/User/user.actions";
import { useDispatch } from "react-redux";

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authListner = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const useRef = await handleUserProfile(userAuth);
        useRef.onSnapshot((snapshot) => {
          localStorage.setItem("key", snapshot.id);
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data,
            })
          );
        });
      }
      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      localStorage.removeItem("key");
      authListner();
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomePageLayout>
              <HomePage />
            </HomePageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
