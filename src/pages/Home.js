// reactstrap components
import { useEffect, useRef, useState } from "react";
import { Card, CardBody, Container, Row, Col, Form, FormGroup, InputGroup, Input, Button, UncontrolledCarousel, UncontrolledTooltip, Popover, PopoverBody } from "reactstrap";
import AnimatedPage from "./AnimatedPage";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import ServiceItem from "./components/ServiceItem";

const items = [
  {
    src: require("assets/img/theme/freepik-brand.png"),
    altText: "",
    caption: "",
    header: ""
  },
  {
    src: require("assets/img/theme/freepik-brand-2.png"),
    altText: "",
    caption: "",
    header: ""
  }
];

const Home = () => {
  const [servicesArr, setServicesArr] = useState([]);

  useFirestoreConnect({
    collection: `services`,
    storeAs: "services",
  });

  const services = useSelector((state) => state.firestore.data.services);
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
  
  return (
    <>
      <section className="header section-profile-cover section-shaped bg-gradient-retink hide-scroller pb-7 pt-5 pt-md-8">
        <AnimatedPage>
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container fluid>
            <div className="header-body mt-2">
              <Row>
                <Col md="6">
                  <div  className="mr-2 ml-2">
                    <h1 className="mt-5 mb-4 text-white">
                      What are you looking for?
                    </h1>
                    
                    <div className="btn-wrapper">
                      <Card className="card-stats cursr card-width-home mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <Col className="col-auto">
                              <div className="icon icon-shape icon-shape-warning rounded-circle shadow">
                                <i className="ni ni-hat-3" />
                              </div>
                            </Col>       
                            <Col>
                              <h3>Help me create a Marketing Plan!</h3>
                              <p className="mt-3 mb-0 text-muted text-sm">
                                  The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that
                              </p>
                            </Col>       
                          </Row>
                        </CardBody>
                      </Card>
                    </div>

                    <div className="btn-wrapper mt-4">
                      <Card className="card-stats cursr card-width-home mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <Col className="col-auto">
                              <div className="icon icon-shape icon-shape-warning rounded-circle shadow">
                                <i className="ni ni-hat-3" />
                              </div>
                            </Col>   
                            <Col>
                              <h3>I know what i am looking for.</h3>
                              <p className="mt-3 mb-0 text-muted text-sm">
                                  The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that
                              </p>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </Col>
                <Col md="6" className="home-pol-index p-2" >
                  <Row>
                    <Col>
                      <span className="mb--7 home-img">
                        <img
                          alt="..."
                          src={require("assets/img/brand/Ikbal.png")}
                        />
                        <span className="hd-1010-hide">
                          <span className="pop-bottom">
                            <div className="popover fade show bs-popover-top popo-home-top" role="tooltip" id="popover493540" x-placement="top">
                              <div className="arrow arr-sty"></div>
                              <div className="popover-body">
                              Hi there! Need help in creating a Marketing plan for your business? I can help you to create one using Retink AI engine.
                              </div>
                            </div>
                          </span>
                          <span className="pop-top">
                            <div className="popover fade show bs-popover-bottom popo-home-bottom" role="tooltip" id="popover491655" x-placement="bottom">
                              <div className="arrow arr-sty"></div>
                              <div className="popover-body">
                                Click on the options to get started
                              </div>
                            </div>
                          </span>
                        </span>
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
          </AnimatedPage>
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
                className="fill-white"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="section section-lg bg-white">
          <Container className="pt-5 pb-5">
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="7">
                <h1 className="font-weight-bold mt-5">
                We are a Human-Centered Digital Content Agency.{" "}
                </h1>
                <h4 className="text-success font-weight-bold mt-2">
                Helping Businesses Innovate and Grow Digitally.
                </h4>
                <p className="lead">
                Our strong creative and technical team are always happy to work with you in every step of your business journey to drive sales and profits, which we make possible through a wide collection of content services and tools to choose from. We are redefining the way businesses create, consume and distribute content online by creating human centred digital solutions, where you come first. No matter how complicated the web and mobile apps you want to develop, we will develop and deploy it for you successfully, as well as help you launch digital marketing campaigns that will wow you!
                </p>
                <div className="btn-wrapper">
                  <Button
                    className="mb-3 mb-sm-0"
                    color="primary"
                    href="#contact-us"
                  >
                    Get Started
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {servicesArr.length > 0 && <>
          <Container className="p-5 mb-5" fluid>
            <Row className="text-center">
              <Col>
                <h1 className="mt-5">SERVICES</h1>
                <p className="mt-3 mb-3 text-muted text-sm">
                    The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that
                </p>
              </Col>
            </Row>
            <Row className="text-center my-auto mx-auto">
              {servicesArr.map((item) => {
                return <ServiceItem serviceObj={item} key={item.id} />
              })}
            </Row>
          </Container>
        </>}
        <>
          <section className="section section-shaped bg-gradient-retink p-5">
            <Container className="py-md">
              <Row className="justify-content-between align-items-center">
                <Col className="mb-5 mb-lg-0" lg="5">
                  <h1 className="text-white font-weight-bold mb-4">
                    Contact Us
                  </h1>
                  <div>
                    <Form role="form">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input placeholder="Name" type="text" />
                        </InputGroup>
                      </FormGroup>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <Input
                                placeholder="Email Address"
                                type="email"
                                autoComplete="new-email"
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <Input
                                placeholder="Phone"
                                type="text"
                                autoComplete="new-phone"
                                maxLength={15}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input placeholder="Country" type="text" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input type="textarea" name="message" id="message" placeholder="Message" />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-right">
                        <Button className="mt-4" color="primary" type="button">
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Col>
                <Col className="mb-lg-auto" lg="6">
                  <div className="rounded shadow-lg overflow-hidden">
                    <UncontrolledCarousel items={items} ref={useRef(null)} />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      </>
  );
};

export default Home;
