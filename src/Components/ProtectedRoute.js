import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  console.log("PPPP ", user);
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

// - git init-> git initialize - git status -> - git add . <!--"." represents all files in a directorey--> - git commit -m "text" <!--ready vayoi haii--> - git config --global user.name "Your Name" // for adding you username of github - git config --global user.email "youremail@yourdomain.com" // for adding you email of github - git config –list
