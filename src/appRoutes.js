import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";

const routes = {
  login: {
    name: "Login",
    path: "/login",
    Component: Login,
    isLocked: false,
    exact: true
  },
  home: {
    name: "Home",
    path: "/",
    Component: HomePage,
    isLocked: true,
    exact: true
  }
};

export default routes;
