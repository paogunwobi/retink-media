// reactstrap components
import { Card, CardBody, Col } from "reactstrap";


const ServiceItem = ({ serviceObj }) => {

  const reduceLength = (str) => {
    if (str.length > 200) {
      return str.substring(0, 200) + '...';
    } else {
      return str;
    }
  }

  return (
    <Col lg="4">
      <div className="btn-wrapper mt-4">
        <Card className="card-stats card-lift--hover shadow border-0 text-center p-4 mb-4 mb-xl-0">
          <CardBody>
            <Col className="col-auto mb-4">
              <div className="icon icon-lg icon-shape icon-shape-warning rounded-circle shadow">
                <i className={`${serviceObj.icon}`} />
              </div>
            </Col>   
            <Col>
              <h3>{serviceObj.title}</h3>
              <p className="mt-3 mb-0 text-muted text-sm">
              {reduceLength(serviceObj.description)}
              </p>
            </Col>
          </CardBody>
        </Card>
      </div>
    </Col>
  );
};

export default ServiceItem;
