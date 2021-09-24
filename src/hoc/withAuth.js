import { useAuth } from "./../customHooks";
import { Redirect, withRouter } from "react-router-dom";

const WithAuth = (props) =>
  useAuth(props) ? props.children : <Redirect to="/" />;

export default withRouter(WithAuth);
