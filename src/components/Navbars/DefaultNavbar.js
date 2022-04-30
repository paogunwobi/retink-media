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

const servicePlaceH = [
  {
    title: "Digital Marketing",
    description: "Gone are the days when you have to market your offers by going from person to person physically. We can now help you reach millions, but much more we can help you convert prospects in larger quantities with our tried and tested strategies.  For example, if you want better brand visibility and awareness on search engines, we have all the tools and strategies to rank you number 1 on Google and any other search engine of your choice. If you’d like to maximize social media, we have cutting-edge strategies to dominate any social media of your choice. In email marketing, we have a knack for making your subscribers your loudest cheerleaders because of our intellectually intriguing and emotionally compelling way of messaging. Whatever you want, wherever you want it? So far it’s digital marketing, you can trust us.  Join us here to give your content and solution the massive publicity it deserves.",
    icon: "fas fa-search",
    path: "/digital-marketing"
  },
  {
    title: "Branding",
    description: "Your prospects won’t become users or repeat customers if your website, applications, or digital designs have a poor interface. But beyond looking good, it must subconsciously educate them on your values and stand as a brand. This is why we maximize colors, fonts, layouts, and other design jargon to communicate relevant emotions to your audience online.  If you want your business to stand out from the rest. We’ve got the tools and strategies to help you build a brand image and experience your customers will remember. ",
    icon: "ni ni-settings-gear-65",
    path: "/branding"
  },
  {
    title: "Digital Consultancy",
    description: "Every progressive and successful business in the 21st century is using the digital advantage with digital solutions that include marketing and technical deliverables to enhance business growth, performance, and revenue.  Let’s analyse your business, give you a marketing audit and IT counseling for your digital strategy development.  Maximize ROI on your digital campaigns with our insights, tech experience, and creativity.  We want to work with your business to tell your story, so you can sell more and multiply your income. Join us here to establish your 10X roadmap.",
    icon: "ni ni-support-16",
    path: "/digital-consultancy"
  }
];

const DefaultNavbar = () => {
  const firebase = useFirebase();
  let history = useHistory();
  const auth = useSelector(state => state.firebase.auth);

  const login = () => {
    history.push('/login');
    // onClick={(e) => e.preventDefault()}
  }

  useFirestoreConnect([
    { collection: 'services' }
  ])
  
  const services = useSelector(state => state.firebase.ordered.services)

  const logout = () => {
    firebase.logout();
  }

  useEffect(() => {
    console.log('Navbar Auth: ', auth);
    console.log('Navbar Services: ', services);
  }, []);

  useEffect(() => {
    console.log('Navbar Auth: ', auth);
    console.log('Navbar Services: ', services);
  }, [auth, services]);

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
                <DropdownMenu>
                  {servicePlaceH.map((item) => { return <DropdownItem to={`${item.path}`} tag={Link}>
                    {item.title}
                  </DropdownItem>})}
                </DropdownMenu>
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
                      <span className="mb-0 text-sm text-dark font-weight-bold">
                        {auth.displayName}
                      </span>
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
