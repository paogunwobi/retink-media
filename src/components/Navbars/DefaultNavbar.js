import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
} from "reactstrap";

import { isLoaded, isEmpty, useFirebase, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

const DefaultNavbar = () => {
  const firebase = useFirebase();
  let history = useHistory();
  const [servicesArr, setServicesArr] = useState([]);
  const auth = useSelector(state => state.firebase.auth);

  useFirestoreConnect({
    collection: `services`,
    storeAs: "services",
  });

  const services = useSelector((state) => state.firestore.data.services);

  const login = () => {
    history.push('/login');
  }

  const getDataArr = (data) => {
    let servicesData = [];
    if (data) {
      Object.keys(data).forEach(e => {
        servicesData.push({...data[e], id: e});
      })
    }
    return servicesData;
  }

  useEffect(() => {
    const data = getDataArr(services);
    setServicesArr([...data]);
  }, [services]);
  
  const logout = () => {
    firebase.logout();
  };

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal bg-white navbar-light box-me-up zind-home-prof" expand="md">
        <Container className="px-4">
          <NavbarBrand className="mr-lg-2" to="/" tag={Link}>
            <img
              alt="..."
              src={require("assets/img/brand/logo-wo-subtitle.png")}
            />
          </NavbarBrand>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={require("assets/img/brand/logo-wo-subtitle.png")}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="mr-auto ml-auto text-dark" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <span className="nav-link-inner--text">Home</span>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <span className="nav-link-inner--text">Services</span>
                </DropdownToggle>
                {services && <DropdownMenu>
                  {services && servicesArr.map((item) => { return <DropdownItem to={`${item.path}`} tag={Link} key={item.id}>
                    {item.title}
                  </DropdownItem>})}
                </DropdownMenu>}
              </UncontrolledDropdown>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/about-us"
                  tag={Link}
                >
                  <span className="nav-link-inner--text">About Us</span>
                </NavLink>
              </NavItem>
            </Nav>

            {(isLoaded(auth) && !isEmpty(auth)) ?  
            <span>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    {auth.photoURL ? <span className="avatar avatar-sm rounded-circle">
                      <img alt="..." src={auth.photoURL} />
                    </span> : <span className="avatar avatar-sm rounded-circle">
                      <img alt="..."
                        src={require("assets/img/brand/avatar-placeholder.png")}
                      />
                    </span>}
                    <Media className="ml-2 d-none d-lg-block">
                      {auth.displayName && <span className="mb-0 text-sm text-dark font-weight-bold">
                        {auth.displayName}
                      </span>}
                      {!auth.displayName && <span className="mb-0 text-sm text-dark font-weight-bold">
                        {auth.username}
                      </span>}
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={logout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </span>
            : <span className="btn-wrapper ml-lg-4">
              <NavLink className="spec-pad" to="/login">
                <Button
                  className="btn-neutral btn-icon mt-1 bg-primary"
                  onClick={login}
                >
                  <span className="btn-inner--icon text-white">
                    <i className="ni ni-key-25" />
                  </span>
                  <span className="btn-inner--text text-white ml-1">LOGIN</span>
                </Button>
              </NavLink>
            </span>}
          </UncontrolledCollapse>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
        </Container>
      </Navbar>
    </>
  );
};

export default DefaultNavbar;
