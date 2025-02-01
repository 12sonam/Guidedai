import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import '../styles/thank-you.css'

const ThankYou = () => {
  const { state } = useLocation();
  const { paymentMethod, totalAmount } = state || {};

  return (
    <section>
        <Container>
            <Row>
                <Col lg='12' className="pt-5 text-center">
                <div className="thank__you">
                    <span><i class="ri-checkbox-circle-line"></i></span>
                    <h1 className="">Thank you for your booking!</h1>
                    <h3 className="mb-4">your tour is booked.</h3>
                    <p>Your payment of <strong>${totalAmount}</strong> has been successfully processed.</p>
                    <p>Payment method used: <strong>{paymentMethod}</strong></p>
                    <p>We look forward to hosting you on your tour!</p>
                    <Button className='btn primary__btn w-25'><Link to='/home'>Back to Home</Link></Button>
                </div>
                </Col>
            </Row>
        </Container>
    </section>
  );
};

export default ThankYou;
