import { useEffect } from "react";
import { useSelector } from "react-redux";

const useAuth = props => {
  const { currentUser } = useSelector(state => state.user);
  useEffect(() => { 
    if (!currentUser && !localStorage.getItem('key')) {
      props.history.push('/login');
    }
  }, [currentUser]);
  return currentUser;
}

export default useAuth;