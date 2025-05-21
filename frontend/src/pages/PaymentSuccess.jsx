// import React, { useEffect, useState, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Spinner } from 'reactstrap';
// import { BASE_URL } from '../utils/config';
// import '../styles/payment-success.css';

// const PaymentSuccess = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const hasFetched = useRef(false); // Prevent duplicate requests

//   useEffect(() => {
//     const fetchPaymentStatus = async () => {
//       try {
//         const queryParams = new URLSearchParams(location.search);
//         const pidx = queryParams.get('pidx');
//         const transaction_id = queryParams.get('transaction_id');
//         const amount = queryParams.get('amount');
//         const purchase_order_id = queryParams.get('purchase_order_id');
//         const itemId = queryParams.get('itemId'); // Get the itemId from query parameters

//         // Check for cancellation (missing required payment parameters)
//         if (!pidx || !transaction_id || !amount || !purchase_order_id) {
//           // Redirect to the booking page if itemId is available
//           if (itemId) {
//             navigate(`/tours/${itemId}`);
//           } else {
//             // Fallback to home page if itemId is not available
//             navigate('/');
//           }
//           return;
//         }

//         const res = await fetch(
//           `${BASE_URL}/payment/complete-khalti-payment?pidx=${pidx}&transaction_id=${transaction_id}&amount=${amount}&purchase_order_id=${purchase_order_id}`,
//           {
//             method: 'GET',
//             credentials: 'include',
//           }
//         );

//         const result = await res.json();
//         console.log('Payment verification response:', result);

//         if (res.ok && result.success) {
//           setPaymentStatus({ success: true, message: result.message, booking: result.booking });
//           setTimeout(() => {
//             navigate('/thank-you', { state: { booking: result.booking } });
//           }, 2000);
//         } else {
//           setPaymentStatus({
//             success: false,
//             message: result.message || 'Payment verification failed. Please check your payment status.',
//             booking: result.booking,
//           });
//           if (result.booking) {
//             setTimeout(() => {
//               navigate('/thank-you', { state: { booking: result.booking } });
//             }, 2000);
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching payment status:', err);
//         setPaymentStatus({
//           success: false,
//           message: 'Error verifying payment: ' + err.message,
//         });
//       }
//     };

//     if (!hasFetched.current) {
//       hasFetched.current = true;
//       fetchPaymentStatus();
//     }
//   }, [location, navigate]);

//   if (!paymentStatus) {
//     return (
//       <section className="payment-success-section">
//         <Container>
//           <Row>
//             <Col lg="12" className="text-center">
//               <div className="payment-success-card">
//                 <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
//                 <h2 className="mt-4">Verifying Payment...</h2>
//                 <p>Please wait while we verify your payment.</p>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     );
//   }

//   return (
//     <section className="payment-success-section">
//       <Container>
//         <Row>
//           <Col lg="12" className="text-center">
//             <div className="payment-success-card animate__animated animate__fadeIn">
//               <span>
//                 <i
//                   className={
//                     paymentStatus.success
//                       ? 'ri-checkbox-circle-line success-icon'
//                       : 'ri-close-circle-line error-icon'
//                   }
//                 ></i>
//               </span>
//               <h2>{paymentStatus.success ? 'Payment Successful!' : 'Payment Verification Issue'}</h2>
//               <p className="message">{paymentStatus.message}</p>
//               {paymentStatus.booking && (
//                 <div className="booking-details">
//                   <h4>Booking Details:</h4>
//                   <p>
//                     <strong>Tour:</strong> {paymentStatus.booking.tourName}
//                   </p>
//                   <p>
//                     <strong>Full Name:</strong> {paymentStatus.booking.fullName}
//                   </p>
//                   <p>
//                     <strong>Total Amount:</strong> ₨{paymentStatus.booking.price.toLocaleString()}
//                   </p>
//                 </div>
//               )}
//               {paymentStatus.success || paymentStatus.booking ? (
//                 <p className="redirect-message">Redirecting to confirmation page...</p>
//               ) : (
//                 <p className="error-message">
//                   Please contact support at <a href="mailto:support@example.com">support@example.com</a> if you have any issues.
//                 </p>
//               )}
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default PaymentSuccess;


import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import '../styles/payment-success.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const hasFetched = useRef(false); // Prevent duplicate requests

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const pidx = queryParams.get('pidx');
        const transaction_id = queryParams.get('transaction_id');
        const amount = queryParams.get('amount');
        const purchase_order_id = queryParams.get('purchase_order_id');
        const itemId = queryParams.get('itemId'); // Get the itemId from query parameters

        // Log query parameters for debugging
        console.log('Query Parameters:', {
          pidx,
          transaction_id,
          amount,
          purchase_order_id,
          itemId,
        });

        // Check for cancellation (missing required payment parameters)
        if (!pidx || !transaction_id || !amount || !purchase_order_id) {
          console.log('Payment canceled, redirecting to booking page...');
          // Redirect to the booking page if itemId is available
          if (itemId) {
            navigate(`/tours/${itemId}`);
          } else {
            console.log('itemId not found, redirecting to homepage');
            // Fallback to home page if itemId is not available
            navigate('/');
          }
          return;
        }

        const res = await fetch(
          `${BASE_URL}/payment/complete-khalti-payment?pidx=${pidx}&transaction_id=${transaction_id}&amount=${amount}&purchase_order_id=${purchase_order_id}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        const result = await res.json();
        console.log('Payment verification response:', result);

        if (res.ok && result.success) {
          setPaymentStatus({ success: true, message: result.message, booking: result.booking });
          setTimeout(() => {
            navigate('/thank-you', { state: { booking: result.booking } });
          }, 2000);
        } else {
          setPaymentStatus({
            success: false,
            message: result.message || 'Payment verification failed. Please check your payment status.',
            booking: result.booking,
          });
          if (result.booking) {
            setTimeout(() => {
              navigate('/thank-you', { state: { booking: result.booking } });
            }, 2000);
          }
        }
      } catch (err) {
        console.error('Error fetching payment status:', err);
        setPaymentStatus({
          success: false,
          message: 'Error verifying payment: ' + err.message,
        });
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchPaymentStatus();
    }
  }, [location, navigate]);

  if (!paymentStatus) {
    return (
      <section className="payment-success-section">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <div className="payment-success-card">
                <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
                <h2 className="mt-4">Verifying Payment...</h2>
                <p>Please wait while we verify your payment.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section className="payment-success-section">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <div className="payment-success-card animate__animated animate__fadeIn">
              <span>
                <i
                  className={
                    paymentStatus.success
                      ? 'ri-checkbox-circle-line success-icon'
                      : 'ri-close-circle-line error-icon'
                  }
                ></i>
              </span>
              <h2>{paymentStatus.success ? 'Payment Successful!' : 'Payment Verification Issue'}</h2>
              <p className="message">{paymentStatus.message}</p>
              {paymentStatus.booking && (
                <div className="booking-details">
                  <h4>Booking Details:</h4>
                  <p>
                    <strong>Tour:</strong> {paymentStatus.booking.tourName}
                  </p>
                  <p>
                    <strong>Full Name:</strong> {paymentStatus.booking.fullName}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ₨{paymentStatus.booking.price.toLocaleString()}
                  </p>
                </div>
              )}
              {paymentStatus.success || paymentStatus.booking ? (
                <p className="redirect-message">Redirecting to confirmation page...</p>
              ) : (
                <p className="error-message">
                  Please contact support at <a href="mailto:support@example.com">support@example.com</a> if you have any issues.
                </p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PaymentSuccess;