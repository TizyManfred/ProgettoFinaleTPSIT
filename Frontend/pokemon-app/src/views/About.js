import React from 'react';
import { Row, Col, CardTitle, Button, CardSubtitle, Card } from 'reactstrap';
import ComponentCard from '../components/ComponentCard';
import ComponentCard2 from '../components/ComponentCard2';
import Carosello from '../components/Carosello';

const About = () => {
  
  return (
    <Row>
      <Col>

        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-envelope"> </i>
            About Us
          </CardTitle>




          <Row className='d-flex'>
            <Col lg="8">
              <div className="mt-5">
                <ComponentCard
                  title="Chi siamo?"
                  subtitle={
                    <h5>
                      <br></br>
                      Noi siamo 4 studenti dell'istituto ITT Michelangelo Buonarroti di trento.
                      <br></br>
                      Frequentiamo la sezione 5^ Digital SCience che frequentano il corso di informatica.
                    </h5>
                  }
                >
                  {/* <Image src='https://www.wrappixel.com/wp-content/uploads/edd/2020/04/xtreme-react-admin-template-y.jpg' alt='pro version image' className='mt-2'/> */}
                  {/* <img src='https://www.wrappixel.com/wp-content/uploads/edd/2020/04/xtreme-react-admin-template-y.jpg' alt='pro version image' className='mt-2' /> */}

                  <img src={`https://www.buonarroti.tn.it/naocology/images/itt_logo_grande_blu_2.png`} alt="pro version" className="w-100"/>

                  <div className="mt-3">
                    <Button
                      color="primary"
                      href="https://www.buonarroti.tn.it/"
                      target="_blank"
                    >
                      Scopri di più
                    </Button>
                  </div>
                </ComponentCard>
              </div>
            </Col>
          </Row>


          <ComponentCard2 title="Ecco i 4 dell' Ave Maria">
            <Row>
              <Carosello></Carosello>
            </Row>
          </ComponentCard2>
        </Card>
      </Col>
    </Row>
  );
};

export default About;
