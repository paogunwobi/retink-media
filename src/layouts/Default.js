import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

// core components
import DefaultNavbar from "components/Navbars/DefaultNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

// import routes from "routes.js";
import Home from "../pages/Home.js";
import Register from "../pages/Register.js";
import Login from "../pages/Login.js";
const Default = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <DefaultNavbar {...props} />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Redirect from="**" to="/" />
          </Switch>
        </div>
      </div>
      <DefaultFooter />
    </>
  );
};

export default Default;
