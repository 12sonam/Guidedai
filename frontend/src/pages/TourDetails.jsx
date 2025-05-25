// import React,{useEffect, useRef, useState, useContext, useDeferredValue} from "react"; 
// import'../styles/tour-details.css'
// import {Container, Row, Col, Form, ListGroup } from 'reactstrap'
// import {useParams} from 'react-router-dom'
// import calculateAvgRating from "../utils/avgRating";
// import avatar from '../assets/images/avatar.jpg'
// import Booking from "../components/Booking/Booking";
// import Newsletter from "../shared/Newsletter";
// import useFetch from './../hooks/useFetch';
// import { BASE_URL } from './../utils/config';
// import {AuthContext} from './../context/AuthContext';


// const Tourdetails = () => {
//     const {id} = useParams()
//     const reviewMsgRef = useRef('')
//     const [tourRating, setTourRating]=useState(null);
//     const {user} = useContext(AuthContext)

//     //fetch data from database
//     const {data:tour, loading, error} = useFetch(`${BASE_URL}/tours/${id}`)

//     //desructure properties from tour object  //budget
//     const {photo, title, desc, price, address, reviews, city, distance, maxGroupSize} = tour;
    
//     const {totalRating, avgRating} = calculateAvgRating(reviews);
    
//     // format date
//     const options = {day:'numeric', month:'long', year:'numeric'};

//     // submit request to the server
//     const submitHandler = async e=> {
//         e.preventDefault();
//         const reviewText = reviewMsgRef.current.value;

//         try {

//             if(!user || user===undefined || user===null ) {
//                 alert('Please sign in')
//             };

//             const reviewObj = {
//                 username:user?.username,
//                 reviewText,
//                 rating:tourRating
//             };

//             const res = await fetch(`${BASE_URL}/review/${id}`, {
//                 method:'post',
//                 headers:{
//                     'content-type':'application/json',
//                 },
//                 credentials:'include',
//                 body:JSON.stringify(reviewObj),
//             });

//             const result = await res.json();
//             if(!res.ok) {
//                 return alert(result.message);
//             }

//             alert (result.message);
//         } catch (err) {
//             alert(err.message);
//         }
//     };

//     useEffect(() => {
//         window.scrollTo(0,0)
//     },[tour])

//     return (
//     <>
    
//     <section>
//         <Container>
//             {
//                 loading && <h4 className="text-center pt-5">Loading.........</h4>
//             }
//             {
//                 error && <h4 className="text-center pt-5">{error}</h4>
//             }
//             {
//                 !loading && !error && (
//                 <Row>
//                 <Col lg='8'>
//                     <div className="tour__content">
//                         <img src={photo} alt="" />

//                         <div className="tour__info">
//                             <h2>{title}</h2>
//                             <div className="d-flex align-items-center gap-5">

//                             <span className="tour__rating d-flex align-items-center gap-1">
//                             <i class="ri-star-fill" style={{'color': "var(--secondary-color)"}}></i> {avgRating === 0 ? null : avgRating} 
//                             {totalRating === 0 ? (
//                                 'Not rated' 
//                             ) : (
//                             <span>({reviews?.length})</span>
//                             )}
//                             </span>

//                                 <span>
//                                 <i class="ri-map-pin-user-fill"></i> {address}
//                                 </span>
//                             </div>

//                             <div className="tour__extra-details">
//                                 <span><i class="ri-map-pin-2-line"></i> {city}</span>
//                                 <span><i class="ri-money-dollar-circle-line"></i> $ / per person{price}</span>
//                                 <span><i class="ri-map-pin-time-line"></i> {distance} k/m</span>
//                                 <span><i class="ri-group-line"></i> {maxGroupSize} people </span>
//                             </div>
//                             <h5>Description</h5>
//                             <p>{desc}</p>
//                         </div>

//                         {/* ======= tour reviews section ========== */}
//                         <div className="tour__reviews mt-4">
//                             <h4>Reviews ({reviews?.length} reviews)</h4>

//                             <Form onSubmit={submitHandler}>
//                                 <div className="d-flex align-items-center gap-3 rating__group">
//                                     <span onClick={() => setTourRating(1)}> 1 <i class="ri-star-fill"></i></span>
//                                     <span onClick={() => setTourRating(2)}> 2 <i class="ri-star-fill"></i></span>
//                                     <span onClick={() => setTourRating(3)}> 3 <i class="ri-star-fill"></i></span>
//                                     <span onClick={() => setTourRating(4)}> 4 <i class="ri-star-fill"></i></span>
//                                     <span onClick={() => setTourRating(5)}> 5 <i class="ri-star-fill"></i></span>
//                                 </div>

//                                 <div className="review__input">
//                                     <input type="text" ref={reviewMsgRef} placeholder="share your thoughts" required/>
//                                     <button className="btn primary__btn text-white" type="submit" >
//                                         Submit
//                                     </button>
//                                 </div>
//                             </Form>

//                             <ListGroup className="user__reviews">
//                                 {reviews?.map(review => (
//                                         <div className="review__item">
//                                             <img src={avatar} alt="" />

//                                             <div className="w-100">
//                                                 <div className="d-flex align-items-center justify-content-between">
//                                                     <div>
//                                                         <h5>{review.username}</h5>
//                                                         <p>{new Date(review.createdAt).toLocaleDateString("en-US", options )}</p>
//                                                     </div>
//                                                     <span className="d-flex align-items-center">
//                                                         {review.rating}<i class="ri-star-fill"></i>
//                                                     </span>
//                                                 </div>

//                                                 <h6>{review.reviewText}</h6>
//                                             </div>
//                                         </div>
//                                     ))
//                                 }
//                             </ListGroup>
//                         </div>
//                         {/* ======= tour reviews section end ========== */}
//                     </div>
//                 </Col>
//                 <Col lg='4'>
//                     <Booking tour={tour} avgRating={avgRating}/>
//                 </Col>
//             </Row>
//                 )
//             }
//         </Container>
//     </section>
//     <Newsletter />
//     </>
//     );
// };

// export default Tourdetails;

import React, { useEffect, useRef, useState, useContext } from "react"; 
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from "../utils/avgRating";
import avatar from '../assets/images/avatar.jpg';
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from './../hooks/useFetch';
import { BASE_URL } from './../utils/config';
import { AuthContext } from './../context/AuthContext';

const TourDetails = () => {
    const { id } = useParams();
    const reviewMsgRef = useRef('');
    const [tourRating, setTourRating] = useState(null);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const { user } = useContext(AuthContext);

    // Fetch data from database
    const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

    // Local state for reviews to update instantly
    const [localReviews, setLocalReviews] = useState([]);

    // Destructure properties from tour object
    const { photo, title, desc, price, address, city, distance, maxGroupSize } = tour || {};

    // Initialize local reviews when tour data is fetched
    useEffect(() => {
        if (tour?.reviews) {
            setLocalReviews(tour.reviews);
        }
    }, [tour]);

    const { totalRating, avgRating } = calculateAvgRating(localReviews);

    // Format date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    // Submit request to the server
    const submitHandler = async (e) => {
        e.preventDefault();
        const reviewText = reviewMsgRef.current.value;

        try {
            if (!user || user === undefined || user === null) {
                alert('Please sign in');
                return;
            }

            const reviewObj = {
                username: user?.username,
                reviewText,
                rating: tourRating,
            };

            const res = await fetch(`${BASE_URL}/review/${id}`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(reviewObj),
            });

            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            }

            // Add the new review to local state with the current date
            const newReview = {
                ...reviewObj,
                createdAt: new Date().toISOString(), // Use current date for instant display
            };
            setLocalReviews((prevReviews) => [...prevReviews, newReview]);

            // Show success dialog
            setShowSuccessDialog(true);
            // Reset form
            reviewMsgRef.current.value = '';
            setTourRating(null);
        } catch (err) {
            alert(err.message);
        }
    };

    // Close dialog after 3 seconds or on click
    useEffect(() => {
        if (showSuccessDialog) {
            const timer = setTimeout(() => {
                setShowSuccessDialog(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessDialog]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tour]);

    return (
        <>
            <section>
                <Container>
                    {loading && <h4 className="text-center pt-5">Loading.........</h4>}
                    {error && <h4 className="text-center pt-5">{error}</h4>}
                    {!loading && !error && (
                        <Row>
                            <Col lg='8'>
                                <div className="tour__content">
                                    <img src={photo} alt="" />
                                    <div className="tour__info">
                                        <h2>{title}</h2>
                                        <div className="d-flex align-items-center gap-5">
                                            <span className="tour__rating d-flex align-items-center gap-1">
                                                <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i> 
                                                {avgRating === 0 ? null : avgRating}
                                                {totalRating === 0 ? (
                                                    'Not rated'
                                                ) : (
                                                    <span>({localReviews?.length})</span>
                                                )}
                                            </span>
                                            <span>
                                                <i className="ri-map-pin-user-fill"></i> {address}
                                            </span>
                                        </div>
                                        <div className="tour__extra-details">
                                            <span><i className="ri-map-pin-2-line"></i> {city}</span>
                                            <span><i className="ri-money-dollar-circle-line"></i> $ / per person {price}</span>
                                            <span><i className="ri-map-pin-time-line"></i> {distance} k/m</span>
                                            <span><i className="ri-group-line"></i> {maxGroupSize} people</span>
                                        </div>
                                        <h5>Description</h5>
                                        <p>{desc}</p>
                                    </div>
                                    {/* ======= Tour Reviews Section ========== */}
                                    <div className="tour__reviews mt-4">
                                        <h4>Reviews ({localReviews?.length} reviews)</h4>
                                        <Form onSubmit={submitHandler}>
                                            <div className="d-flex align-items-center gap-3 rating__group">
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <span
                                                        key={rating}
                                                        onClick={() => setTourRating(rating)}
                                                        className={tourRating >= rating ? 'star--active' : ''}
                                                    >
                                                        {rating} <i className="ri-star-fill"></i>
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="review__input">
                                                <input
                                                    type="text"
                                                    ref={reviewMsgRef}
                                                    placeholder="share your thoughts"
                                                    required
                                                />
                                                <button className="btn primary__btn text-white" type="submit">
                                                    Submit
                                                </button>
                                            </div>
                                        </Form>
                                        <ListGroup className="user__reviews">
                                            {localReviews?.map((review, index) => (
                                                <div className="review__item" key={index}>
                                                    <img src={avatar} alt="" />
                                                    <div className="w-100">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <h5>{review.username}</h5>
                                                                <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                                                            </div>
                                                            <span className="d-flex align-items-center">
                                                                {review.rating}<i className="ri-star-fill"></i>
                                                            </span>
                                                        </div>
                                                        <h6>{review.reviewText}</h6>
                                                    </div>
                                                </div>
                                            ))}
                                        </ListGroup>
                                    </div>
                                    {/* ======= Tour Reviews Section End ========== */}
                                </div>
                            </Col>
                            <Col lg='4'>
                                <Booking tour={tour} avgRating={avgRating} />
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
            <Newsletter />
            {/* Success Dialog Box */}
            {showSuccessDialog && (
                <div className="success-dialog">
                    <div className="success-dialog__content">
                        <h3>Success!</h3>
                        <p>Your review has been submitted successfully.</p>
                        <button
                            className="btn success-dialog__btn"
                            onClick={() => setShowSuccessDialog(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TourDetails;