import React, { useState } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate();

  const [credentails, setCredentails] = useState({
    userId: '01',
    userEmail: 'example@gmail.com',
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  const handleChange = (e) => {
    setCredentails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(credentails.guestSize) + Number(serviceFee);

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/thank-you', { state: { paymentMethod, totalAmount } });  // Send payment method and total amount to ThankYou page
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price} <span>/per person</span></h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" placeholder="" id="bookAt" required onChange={handleChange} />
            <input type="number" placeholder="Guest" id="guestSize" required onChange={handleChange} />
          </FormGroup>

          {/* Payment Method Selection */}
          <h5>Select Payment Method</h5>
          <FormGroup>
            <select id="paymentMethod" onChange={handlePaymentChange} required>
              <option value="">-- Select Payment Method --</option>
              <option value="fonepay">FonePay</option>
              <option value="connectips">ConnectIPS</option>
              <option value="sct">SCT</option>
              <option value="nps">NPS</option>
            </select>
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">${price} <i className="ri-close-line"></i> 1 person</h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>Book Now</Button>
      </div>
    </div>
  );
};

export default Booking;