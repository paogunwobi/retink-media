import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
  UncontrolledAlert,
} from "reactstrap";
import AnimatedPage from "./AnimatedPage";

const Login = () => {
  
  const firebase = useFirebase();
  let history = useHistory();
  const [ form, setForm ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ success, setSuccess ] = useState(false);
  const [ failed, setFailed ] = useState(false);
  const [ errMsg, setErrMsg ] = useState("Something went wrong!");

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  
  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then((userData) => {
        console.log('Login Google User Data: ', userData);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          history.push('/');
        }, 5000);
      }).catch((err) => {
        console.log("Login User with Google Err: ", err);
        setErrMsg(err.message);
        setFailed(true);
        setTimeout(() => {
          setFailed(false);
        }, 20000)
      });
  };

  const signInWithEmail = (email, password) => {
    firebase.login({
      email,
      password
    }).then((userData) => {
      console.log('Login User Data: ', userData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        history.push('/');
      }, 5000);
    }).catch((err) => {
      console.log("Login User Err: ", err);
      setErrMsg(err.message);
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 20000)
    })
  }

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const { email, password } = form
    const newErrors = {}
    // name errors
    if ( !password || password === '' ) newErrors.name = 'cannot be blank!'
    else if ( password.length < 6 ) newErrors.name = 'Invalid Credentials!'
    
    // email errors
    if ( !email || email === '' ) newErrors.email = 'Email cannot be blank!!'

    return newErrors
  }

  const handleSubmit = e => {
    e.preventDefault()
    // get our new errors
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    } else {
      const { email, password } = form;
      console.log('Form object: ', form);
      signInWithEmail(email, password);
      console.log("Submitted")
    }
  }

  return (
      <>
        <div className="header bg-gradient-retink py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-3">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome Back!</h1>
                  <p className="text-lead text-light font-weight-bold">
                    Sign in to Continue.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <AnimatedPage>
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                  {success && <UncontrolledAlert color="info">
                    Login Successful!
                  </UncontrolledAlert>}
                  {failed && <UncontrolledAlert color="danger">
                    {errMsg}
                  </UncontrolledAlert>}
                  <div className="text-muted text-center mt-2 mb-3">
                    <small>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center mt-2">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="#"
                      onClick={(ev) => {
                        ev.preventDefault();
                        signInWithGoogle();
                      }}
                    >
                      <span className="btn-inner--icon">
                        <img
                          alt="..."
                          src={
                            require("assets/img/icons/common/google.svg").default
                          }
                        />
                      </span>
                      <span className="btn-inner--text">Google</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          name="email"
                          type="email"
                          autoComplete="new-email"
                          onChange={ e => setField('email', e.target.value) }
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          onChange={ e => setField('password', e.target.value) }
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <Button className="my-4" color="primary" type='submit' onClick={ handleSubmit }>
                        Sign in
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="/register"
                  >
                    <small>Create new account</small>
                  </a>
                </Col>
              </Row>
            </Col>
            </Row>
          </Container>
        </AnimatedPage>
      </>
  );
};

export default Login;
