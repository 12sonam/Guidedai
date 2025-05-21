// //Booking.jsx
// import React, { useState, useContext } from 'react';
// import './booking.css';
// import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { BASE_URL } from '../../utils/config';

// const Booking = ({ tour, avgRating }) => {
//   const { price, reviews, title } = tour;
//   const navigate = useNavigate();

//   const {user} = useContext(AuthContext)

//   const [booking, setBooking] = useState({
//     userId: user && user._id,
//     userEmail: user && user.email,
//     tourName: title,
//     fullName: '',
//     phone: '',
//     guestSize: 1,
//     bookAt: '',
//     payment: 'pending', // Default payment status
//     price: price * 1 + 10, // Calculate total price based on guestSize later
//   });
  

//   const [paymentMethod, setPaymentMethod] = useState('');

//   const handleChange = (e) => {
//     setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   // const handlePaymentChange = (e) => {
//   //   setPaymentMethod(e.target.value);
//   // };
//   const handleKhaltiPayment = (e) => {
//     setBooking((prev) => ({
//       ...prev,
//       payment: e.target.value,  // <-- Ensure 'payment' field is included
//     }));
// };

//   const serviceFee = 10;
//   const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

//   // send data to server
//   const handleClick = async (e) => {
//     e.preventDefault();
  
//     try {
//       if (!user || user === undefined || user === null) {
//         return alert('Please sign in');
//       }
  
//       const res = await fetch(`${BASE_URL}/booking`, {
//         method: 'post',
//         headers: {
//           'content-type': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           ...booking,
//           fullName: booking.fullName,
//           guestSize: Number(booking.guestSize),
//           phone: Number(booking.phone),
//           bookAt: booking.bookAt,
//           payment: paymentMethod || 'pending', // Default to pending if not chosen
//           price: totalAmount // ✅ Send total amount here!
//         })
//       });
  
//       const result = await res.json();
  
//       if (!res.ok) {
//         return alert(result.message);
//       }
  
//       navigate('/thank-you', { state: { paymentMethod, totalAmount } });
//     } catch (err) {
//       alert(err.message);
//     }
//   };
  
//   // const handleClick = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     if(!user || user === undefined || user === null){
//   //       return alert('Please sign in')
//   //     }

//   //     const res = await fetch(`${BASE_URL}/booking`, {
//   //       method:'post',
//   //       headers:{
//   //         'content-type':'application/json'
//   //       },
//   //       credentials:'include',
//   //       body:JSON.stringify({
//   //         ...booking,
//   //         tourName: tour.title,
//   //         userId: user._id,
//   //       userEmail: user.email,
//   //       fullName: booking.fullName,
//   //       guestSize: Number(booking.guestSize),
//   //       phone: Number(booking.phone),
//   //       bookAt: booking.bookAt,
//   //       payment: 'pending', // Default status
//   //         amount: totalAmount
//   //       })
//   //     });
 
//   //     const result = await res.json();

//   //     if (!res.ok) {
//   //       return alert(result.message);
//   //     }
//   //     navigate('/thank-you', { state: { paymentMethod, totalAmount } });
//   //   } catch (err) {
//   //     alert(err.message);
//   //   }
//   // };

//   return (
//     <div className="booking">
//       <div className="booking__top d-flex align-items-center justify-content-between">
//         <h3>${price} <span>/per person</span></h3>
//         <span className="tour__rating d-flex align-items-center">
//           <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating} ({reviews?.length})
//         </span>
//       </div>

//       <div className="booking__form">
//         <h5>Information</h5>
//         <Form className="booking__info-form" onSubmit={handleClick}>
//           <FormGroup>
//             <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
//           </FormGroup>
//           <FormGroup>
//             <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
//           </FormGroup>
//           <FormGroup className="d-flex align-items-center gap-3">
//             <input type="date" placeholder="" id="bookAt" required onChange={handleChange} />
//             <input type="number" placeholder="Guest" id="guestSize" required onChange={handleChange} />
//           </FormGroup>

//           {/* Payment Method Selection */}
//           {/* <h5>Select Payment Method</h5>
//           <FormGroup>
//             <select id="paymentMethod" onChange={handlePaymentChange} required>
//               <option value="">-- Select Payment Method --</option>
//               <option value="fonepay">FonePay</option>
//               <option value="connectips">ConnectIPS</option>
//               <option value="sct">SCT</option>
//               <option value="nps">NPS</option>
//             </select>
//           </FormGroup> */}
//           <h5>Select Payment Method</h5>
// <FormGroup>
//   <button 
//     type="button" 
//     onClick={handleKhaltiPayment}
//     style={{
//       backgroundColor: '#5C2D91', 
//       color: 'white',
//       border: 'none',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       fontSize: '16px',
//       fontWeight: 'bold'
//     }}
//   >
//     Pay with Khalti
//   </button>
// </FormGroup>
//         </Form>
//       </div>

//       <div className="booking__bottom">
//         <ListGroup>
//           <ListGroupItem className="border-0 px-0">
//             <h5 className="d-flex align-items-center gap-1">${price} <i className="ri-close-line"></i> 1 person</h5>
//             <span>${price}</span>
//           </ListGroupItem>
//           <ListGroupItem className="border-0 px-0">
//             <h5>Service charge</h5>
//             <span>${serviceFee}</span>
//           </ListGroupItem>
//           <ListGroupItem className="border-0 px-0 total">
//             <h5>Total</h5>
//             <span>${totalAmount}</span>
//           </ListGroupItem>
//         </ListGroup>

//         <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>Book Now</Button>
//       </div>
//     </div>
//   );
// };

// export default Booking;


// import React, { useState, useContext } from 'react';
// import './booking.css';
// import { Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { BASE_URL } from '../../utils/config';

// const Booking = ({ tour, avgRating }) => {
//   const { price: priceUSD, reviews, title, _id: itemId } = tour; // Price in USD
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const EXCHANGE_RATE = 134;

//   const [currency, setCurrency] = useState('USD'); // Default currency is USD
//   const [booking, setBooking] = useState({
//     userId: user && user._id,
//     userEmail: user && user.email,
//     tourName: title,
//     fullName: '',
//     phone: '',
//     guestSize: 1,
//     bookAt: '',
//     payment: 'pending',
//     price: priceUSD * 1 + 10, // Initial price, will be updated with totalAmount
//   });

//   // Calculate price based on selected currency (for display purposes only)
//   const priceInSelectedCurrency = currency === 'USD' ? priceUSD : priceUSD * EXCHANGE_RATE;
//   const serviceFeeInSelectedCurrency = currency === 'USD' ? 10 : 10 * EXCHANGE_RATE;
//   const totalAmountInSelectedCurrency = Number(priceInSelectedCurrency) * Number(booking.guestSize) + Number(serviceFeeInSelectedCurrency);

//   // Convert total amount to NPR for Khalti payment
//   const totalAmountInNPR = currency === 'USD' ? totalAmountInSelectedCurrency * EXCHANGE_RATE : totalAmountInSelectedCurrency;

//   const handleChange = (e) => {
//     setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleCurrencyChange = (e) => {
//     setCurrency(e.target.value);
//   };

//   // Handle Khalti Payment
//   const handleKhaltiPayment = async (e) => {
//     e.preventDefault();

//     if (!user || user === undefined || user === null) {
//       return alert('Please sign in');
//     }

//     // Validate form fields before proceeding
//     if (!booking.fullName || !booking.phone || !booking.bookAt || !booking.guestSize) {
//       return alert('Please fill in all required fields: Full Name, Phone, Date, and Guest Size');
//     }

//     // Check if totalAmountInNPR is a valid number
//     if (isNaN(totalAmountInNPR)) {
//       alert('Error calculating payment amount. Please try again.');
//       return;
//     }

//     // Confirm payment with the user
//     const confirmPayment = window.confirm(`You will be charged ₨${totalAmountInNPR.toFixed(2)} for this booking. Proceed?`);
//     if (!confirmPayment) return;

//     try {
//       const paymentData = {
//         itemId, // The tour ID
//         fullName: booking.fullName,
//         userEmail: booking.userEmail,
//         userId: booking.userId,
//         tourName: booking.tourName,
//         guestSize: Number(booking.guestSize),
//         phone: Number(booking.phone),
//         bookAt: booking.bookAt,
//         price: totalAmountInNPR, // Send the total amount in NPR to Khalti
//         originalPrice: totalAmountInSelectedCurrency, // Send the original price in the selected currency
//         originalCurrency: currency, // Send the selected currency (USD or NPR)
//         website_url: BASE_URL,
//       };

//       const res = await fetch(`${BASE_URL}/payment/initialize-khalti`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(paymentData),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         return alert(result.message || 'Failed to initialize payment');
//       }

//       // Redirect to the Khalti payment URL
//       if (result.success && result.payment && result.payment.payment_url) {
//         window.location.href = result.payment.payment_url; // Redirect to Khalti payment page
//       } else {
//         alert('Payment URL not found in response');
//       }
//     } catch (err) {
//       alert('Error initializing payment: ' + err.message);
//     }
//   };

//   return (
//     <div className="booking">
//       <div className="booking__top d-flex align-items-center justify-content-between">
//         <h3>
//           {currency === 'USD' ? `$${priceUSD}` : `₨${priceUSD * EXCHANGE_RATE}`}{' '}
//           <span>/per person</span>
//         </h3>
//         <span className="tour__rating d-flex align-items-center">
//           <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating} ({reviews?.length})
//         </span>
//       </div>

//       <div className="booking__form">
//         <h5>Information</h5>
//         <Form className="booking__info-form">
//           <FormGroup>
//             <input
//               type="text"
//               placeholder="Full Name"
//               id="fullName"
//               required
//               onChange={handleChange}
//             />
//           </FormGroup>
//           <FormGroup>
//             <input
//               type="number"
//               placeholder="Phone"
//               id="phone"
//               required
//               onChange={handleChange}
//             />
//           </FormGroup>
//           <FormGroup className="d-flex align-items-center gap-3">
//             <input
//               type="date"
//               placeholder=""
//               id="bookAt"
//               required
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               placeholder="Guest"
//               id="guestSize"
//               required
//               onChange={handleChange}
//             />
//           </FormGroup>

//           <h5>Select Currency</h5>
//           <FormGroup>
//             <select value={currency} onChange={handleCurrencyChange}>
//               <option value="USD">USD ($)</option>
//               <option value="NPR">NPR (₨)</option>
//             </select>
//           </FormGroup>

//           <h5>Payment Method</h5>
//           <FormGroup>
//             <button
//               type="button"
//               onClick={handleKhaltiPayment}
//               style={{
//                 backgroundColor: '#5C2D91',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//               }}
//             >
//               Pay with Khalti
//             </button>
//           </FormGroup>
//         </Form>
//       </div>

//       <div className="booking__bottom">
//         <ListGroup>
//           <ListGroupItem className="border-0 px-0">
//             <h5 className="d-flex align-items-center gap-1">
//               {currency === 'USD' ? `$${priceUSD}` : `₨${priceUSD * EXCHANGE_RATE}`}{' '}
//               <i className="ri-close-line"></i> 1 person
//             </h5>
//             <span>{currency === 'USD' ? `$${priceUSD}` : `₨${priceUSD * EXCHANGE_RATE}`}</span>
//           </ListGroupItem>
//           <ListGroupItem className="border-0 px-0">
//             <h5>Service charge</h5>
//             <span>{currency === 'USD' ? `$${serviceFeeInSelectedCurrency}` : `₨${serviceFeeInSelectedCurrency}`}</span>
//           </ListGroupItem>
//           <ListGroupItem className="border-0 px-0 total">
//             <h5>Total</h5>
//             <span>{currency === 'USD' ? `$${totalAmountInSelectedCurrency}` : `₨${totalAmountInSelectedCurrency}`}</span>
//           </ListGroupItem>
//         </ListGroup>
//       </div>
//     </div>
//   );
// };

// export default Booking;


// import React, { useState, useContext } from 'react';
// import './booking.css';
// import { Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { BASE_URL } from '../../utils/config';

// const Booking = ({ tour, avgRating }) => {
//   const { price: priceUSD, reviews, title, _id: itemId } = tour; // Price in USD
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const EXCHANGE_RATE = 134;

//   const [currency, setCurrency] = useState('USD'); // Default currency is USD
//   const [booking, setBooking] = useState({
//     userId: user && user._id,
//     userEmail: user && user.email,
//     tourName: title,
//     fullName: '',
//     phone: '',
//     guestSize: 1,
//     bookAt: '',
//     payment: 'pending',
//     price: priceUSD * 1 + 10, // Initial price, will be updated with totalAmount
//   });

//   // Calculate price based on selected currency (for display purposes only)
//   const priceInSelectedCurrency = currency === 'USD' ? priceUSD : priceUSD * EXCHANGE_RATE;
//   const serviceFeeInSelectedCurrency = currency === 'USD' ? 10 : 10 * EXCHANGE_RATE;
//   const totalAmountInSelectedCurrency = Number(priceInSelectedCurrency) * Number(booking.guestSize) + Number(serviceFeeInSelectedCurrency);

//   // Convert total amount to NPR for Khalti payment
//   const totalAmountInNPR = currency === 'USD' ? totalAmountInSelectedCurrency * EXCHANGE_RATE : totalAmountInSelectedCurrency;

//   const handleChange = (e) => {
//     setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleCurrencyChange = (e) => {
//     setCurrency(e.target.value);
//   };

//   // Handle Khalti Payment
//   const handleKhaltiPayment = async (e) => {
//     e.preventDefault();

//     if (!user || user === undefined || user === null) {
//       return alert('Please sign in');
//     }

//     // Validate form fields before proceeding
//     if (!booking.fullName || !booking.phone || !booking.bookAt || !booking.guestSize) {
//       return alert('Please fill in all required fields: Full Name, Phone, Date, and Guest Size');
//     }

//     // Check if totalAmountInNPR is a valid number
//     if (isNaN(totalAmountInNPR)) {
//       alert('Error calculating payment amount. Please try again.');
//       return;
//     }

//     // Confirm payment with the user
//     const confirmPayment = window.confirm(`You will be charged ₨${totalAmountInNPR.toFixed(2)} for this booking. Proceed?`);
//     if (!confirmPayment) return;

//     try {
//       const paymentData = {
//         itemId, // The tour ID
//         fullName: booking.fullName,
//         userEmail: booking.userEmail,
//         userId: booking.userId,
//         tourName: booking.tourName,
//         guestSize: Number(booking.guestSize),
//         phone: Number(booking.phone),
//         bookAt: booking.bookAt,
//         price: totalAmountInNPR, // Send the total amount in NPR to Khalti
//         originalPrice: totalAmountInSelectedCurrency, // Send the original price in the selected currency
//         originalCurrency: currency, // Send the selected currency (USD or NPR)
//         website_url: BASE_URL,
//       };

//       const res = await fetch(`${BASE_URL}/payment/initialize-khalti`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(paymentData),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         return alert(result.message || 'Failed to initialize payment');
//       }

//       // Redirect to the Khalti payment URL
//       if (result.success && result.payment && result.payment.payment_url) {
//         window.location.href = result.payment.payment_url; // Redirect to Khalti payment page
//       } else {
//         alert('Payment URL not found in response');
//       }
//     } catch (err) {
//       alert('Error initializing payment: ' + err.message);
//     }
//   };

//   return (
//     <div className="booking">
//       <div className="booking__top d-flex align-items-center justify-content-between">
//         <h3>
//           {currency === 'USD' ? `$${priceUSD}` : `₨${priceUSD * EXCHANGE_RATE}`}{' '}
//           <span>/per person</span>
//         </h3>
//         <span className="tour__rating d-flex align-items-center">
//           <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating} ({reviews?.length})
//         </span>
//       </div>

//       <div className="booking__form">
//         <h5>Information</h5>
//         <Form className="booking__info-form">
//           <FormGroup>
//             <input
//               type="text"
//               placeholder="Full Name"
//               id="fullName"
//               required
//               onChange={handleChange}
//             />
//           </FormGroup>
//           <FormGroup>
//             <input
//               type="number"
//               placeholder="Phone"
//               id="phone"
//               required
//               onChange={handleChange}
//             />
//           </FormGroup>
//           <FormGroup className="d-flex align-items-center gap-3">
//             <input
//               type="date"
//               placeholder=""
//               id="bookAt"
//               required
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               placeholder="Guest"
//               id="guestSize"
//               required
//               onChange={handleChange}
//             />
//           </FormGroup>

//           <h5>Select Currency</h5>
//           <FormGroup>
//             <select value={currency} onChange={handleCurrencyChange}>
//               <option value="USD">USD ($)</option>
//               <option value="NPR">NPR (₨)</option>
//             </select>
//           </FormGroup>

//           <h5>Payment Method</h5>
//           <FormGroup>
//             <button
//               type="button"
//               onClick={handleKhaltiPayment}
//               style={{
//                 backgroundColor: '#5C2D91',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//               }}
//             >
//               Pay with Khalti
//             </button>
//           </FormGroup>
//         </Form>
//       </div>

//       <div className="booking__bottom">
//         <ListGroup>
//           <ListGroupItem className="border-0 px-0">
//             <h5 className="d-flex align-items-center gap-1">
//               {currency === 'USD' ? `$${priceUSD}` : `₨${priceUSD * EXCHANGE_RATE}`}{' '}
//               <i className="ri-close-line"></i> 1 person
//             </h5>
//             <span>{currency === 'USD' ? `$${priceUSD}` : `₨${priceUSD * EXCHANGE_RATE}`}</span>
//           </ListGroupItem>
//           <ListGroupItem className="border-0 px-0">
//             <h5>Service charge</h5>
//             <span>{currency === 'USD' ? `$${serviceFeeInSelectedCurrency}` : `₨${serviceFeeInSelectedCurrency}`}</span>
//           </ListGroupItem>
//           <ListGroupItem className="border-0 px-0 total">
//             <h5>Total</h5>
//             <span>{currency === 'USD' ? `$${totalAmountInSelectedCurrency}` : `₨${totalAmountInSelectedCurrency}`}</span>
//           </ListGroupItem>
//         </ListGroup>
//       </div>
//     </div>
//   );
// };

// export default Booking;

import React, { useState, useContext } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Booking = ({ tour, avgRating }) => {
  const { price: priceUSD, reviews, title, _id: itemId } = tour; // Price in USD
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const EXCHANGE_RATE = 134;

  const [currency, setCurrency] = useState('USD'); // Default currency is USD
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourId: itemId, // Add tourId to the booking state
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: '',
    payment: 'pending',
    price: priceUSD * 1 + 10, // Initial price, will be updated with totalAmount
  });

  // Calculate price based on selected currency (for display purposes only)
  const priceInSelectedCurrency = currency === 'USD' ? priceUSD : priceUSD * EXCHANGE_RATE;
  const serviceFeeInSelectedCurrency = currency === 'USD' ? 10 : 10 * EXCHANGE_RATE;
  const totalAmountInSelectedCurrency = Number(priceInSelectedCurrency) * Number(booking.guestSize) + Number(serviceFeeInSelectedCurrency);

  // Convert total amount to NPR for Khalti payment
  const totalAmountInNPR = currency === 'USD' ? totalAmountInSelectedCurrency * EXCHANGE_RATE : totalAmountInSelectedCurrency;

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  // Handle Khalti Payment
  const handleKhaltiPayment = async (e) => {
    e.preventDefault();

    if (!user || user === undefined || user === null) {
      return alert('Please sign in');
    }

    // Validate form fields before proceeding
    if (!booking.fullName || !booking.phone || !booking.bookAt || !booking.guestSize) {
      return alert('Please fill in all required fields: Full Name, Phone, Date, and Guest Size');
    }

    // Check if totalAmountInNPR is a valid number
    if (isNaN(totalAmountInNPR)) {
      alert('Error calculating payment amount. Please try again.');
      return;
    }

    // Confirm payment with the user
    const confirmPayment = window.confirm(`You will be charged ₨${totalAmountInNPR.toFixed(2)} for this booking. Proceed?`);
    if (!confirmPayment) return;

    try {
      const paymentData = {
        itemId, // The tour ID (for Khalti metadata)
        tourId: itemId, // Explicitly include tourId for the booking
        fullName: booking.fullName,
        userEmail: booking.userEmail,
        userId: booking.userId,
        tourName: booking.tourName,
        guestSize: Number(booking.guestSize),
        phone: Number(booking.phone),
        bookAt: booking.bookAt,
        price: totalAmountInNPR, // Send the total amount in NPR to Khalti
        originalPrice: totalAmountInSelectedCurrency, // Send the original price in the selected currency
        originalCurrency: currency, // Send the selected currency (USD or NPR)
        website_url: BASE_URL,
      };

      const res = await fetch(`${BASE_URL}/payment/initialize-khalti`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(paymentData),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message || 'Failed to initialize payment');
      }

      // Redirect to the Khalti payment URL
      if (result.success && result.payment && result.payment.payment_url) {
        window.location.href = result.payment.payment_url; // Redirect to Khalti payment page
      } else {
        alert('Payment URL not found in response');
      }
    } catch (err) {
      alert('Error initializing payment: ' + err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          {currency === 'USD' ? `$${priceUSD}` : `₨${priceUSD * EXCHANGE_RATE}`}{' '}
          <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form">
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <h5>Select Currency</h5>
          <FormGroup>
            <select value={currency} onChange={handleCurrencyChange}>
              <option value="USD">USD ($)</option>
              <option value="NPR">NPR (₨)</option>
            </select>
          </FormGroup>

          <h5>Payment Method</h5>
          <FormGroup>
            <button
              type="button"
              onClick={handleKhaltiPayment}
              style={{
                backgroundColor: '#5C2D91',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Pay with Khalti
            </button>
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              {currency === 'USD' ? `$${priceUSD}` : `₨${priceUSD * EXCHANGE_RATE}`}{' '}
              <i className="ri-close-line"></i> 1 person
            </h5>
            <span>{currency === 'USD' ? `$${priceUSD}` : `₨${priceUSD * EXCHANGE_RATE}`}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>{currency === 'USD' ? `$${serviceFeeInSelectedCurrency}` : `₨${serviceFeeInSelectedCurrency}`}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>{currency === 'USD' ? `$${totalAmountInSelectedCurrency}` : `₨${totalAmountInSelectedCurrency}`}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;