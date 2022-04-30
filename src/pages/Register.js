import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
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
import AnimatedPage from './AnimatedPage';

const Register = () => {
  const firebase = useFirebase();
  let history = useHistory();
  const [ form, setForm ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ success, setSuccess ] = useState(false);
  const [ failed, setFailed ] = useState(false);
  const [ errMsg, setErrMsg ] = useState("Something went wrong!");
  const createNewUser = ({ email, password, username }) => {
    firebase.createUser(
      { email, password },
      { username, email }
    ).then((userData) => {
      console.log('User Data: ', userData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        history.push('/');
      }, 5000)
    }).catch((err) => {
      console.log("Register Error: ", err)
      setErrMsg(err.message);
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 20000)
    })
  }

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
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

  const handleSubmit = e => {
    e.preventDefault()
    // get our new errors
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    } else {
      // No errors! Put any logic here for the form submission!
      // alert('Thank you for your feedback!')
      createNewUser(form);
      console.log("Submitted")
    }
  }

  const findFormErrors = () => {
    const { name, email, username, password } = form
    const newErrors = {}
    // name errors
    if ( !name || name === '' ) newErrors.name = 'cannot be blank!'
    else if ( name.length > 30 ) newErrors.name = 'Name is too long!'
    
    if ( !username || username === '' ) newErrors.username = 'Username cannot be blank!'
    else if ( username.length > 15 ) newErrors.username = 'Username is too long!'
    // food errors
    if ( !email || email === '' ) newErrors.email = 'Email cannot be blank!!'

    if ( !password || password === '' ) newErrors.name = 'cannot be blank!'
    else if ( password.length < 6 ) newErrors.name = 'Password cannot be less than 6 Characters!'

    return newErrors
  }
  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);

  return (
      <>
        <div className="header bg-gradient-retink py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-3">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome!</h1>
                    <p className="text-lead text-light font-weight-bold">
                      Create an Account. Let;s help in your journey to Innovations and Digital Growth.
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
          <AnimatedPage>
            <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                <Col lg="6" md="8">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                      {success && <UncontrolledAlert color="info">
                        Account Created Successfully!
                      </UncontrolledAlert>}
                      {failed && <UncontrolledAlert color="danger">
                        {errMsg}
                      </UncontrolledAlert>}
                      <div className="text-muted text-center mt-2 mb-4">
                        <small>Sign up with</small>
                      </div>
                      <div className="text-center mt-2">
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
                                require("assets/img/icons/common/google.svg")
                                  .default
                              }
                            />
                          </span>
                          <span className="btn-inner--text">Google</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                      </div>
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Full Name" type="text" onChange={ e => setField('name', e.target.value) } isInvalid={ !!errors.name } />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="username" type="text" onChange={ e => setField('username', e.target.value) } isInvalid={ !!errors.username } />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              autoComplete="new-email"
                              onChange={ e => setField('email', e.target.value) } isInvalid={ !!errors.email }
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
                              type="password"
                              autoComplete="new-password"
                              onChange={ e => setField('password', e.target.value) } isInvalid={ !!errors.password }
                            />
                          </InputGroup>
                        </FormGroup>
                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="customCheckRegister"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckRegister"
                              >
                                <span className="text-muted">
                                  I agree with the{" "}
                                  <a href="#" onClick={(e) => e.preventDefault()}>
                                    Privacy Policy
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <div className="text-center">
                          <Button className="mt-4" color="primary" type='submit' onClick={ handleSubmit }>
                            Create account
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                <Col xs="6">
                  <span
                    className="text-light"
                  >
                    <small>Have an Account with us?</small>
                  </span>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="/login"
                  >
                    <small>Sign in</small>
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

export default Register;
