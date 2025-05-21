import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/thank-you.css';

const ThankYou = () => {
  const { state } = useLocation();
  const { booking } = state || {};

  // Add ripple effect to the button on click
  useEffect(() => {
    const button = document.querySelector('.primary__btn');
    if (button) {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    }
  }, []);

  return (
    <section className="thank-you-section">
      <div className="floating-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <div className="thank-you-card">
              <span className="success-icon">✔</span>
              <h1 className="thank-you-title">Thank You for Your Booking!</h1>
              <h3 className="mb-4">Your tour is booked.</h3>

              {booking ? (
                <div className="booking-details">
                  <h4>Booking Summary</h4>
                  <div className="booking-timeline">
                    <div className="timeline-item">
                      <span className="timeline-icon">🏞️</span>
                      <div className="timeline-content">
                        <p>
                          <strong>Tour:</strong> {booking.tourName}
                        </p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-icon">👤</span>
                      <div className="timeline-content">
                        <p>
                          <strong>Full Name:</strong> {booking.fullName}
                        </p>
                        <p>
                          <strong>Guest Size:</strong> {booking.guestSize}
                        </p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-icon">📅</span>
                      <div className="timeline-content">
                        <p>
                          <strong>Booking Date:</strong>{' '}
                          {new Date(booking.bookAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-icon">💸</span>
                      <div className="timeline-content">
                        <p>
                          <strong>Total Amount:</strong> ₨{booking.price.toLocaleString()}
                        </p>
                        <p>
                          <strong>Payment Status:</strong>{' '}
                          {booking.payment === 'completed' ? (
                            <span className="payment-success">Completed</span>
                          ) : (
                            <span className="payment-pending">Pending</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  {booking.payment === 'completed' ? (
                    <p className="success-message">Your payment has been successfully processed.</p>
                  ) : (
                    <p className="pending-message">Please complete your payment to confirm your booking.</p>
                  )}
                </div>
              ) : (
                <div className="booking-details">
                  <p>No booking details available.</p>
                </div>
              )}

              <p className="welcome-message">We look forward to hosting you on your tour!</p>
              <Button className="btn primary__btn">
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;