import React, {useRef} from "react";
import './search-bar.css';
import { Col, Form, FormGroup} from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {

    const titleRef = useRef(' ');
    const priceRef = useRef(0);
    const maxGropuSizeRef = useRef(0);
    const navigate = useNavigate()

    const searchHandler = async() => {

        const title = titleRef.current.value
        const price = priceRef.current.value
        const maxGroupSize = maxGropuSizeRef.current.value

        if(title ==='' || price ==='' || maxGroupSize===''){
            return alert('All fields are required!');
        }

        const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?title=${title}&price=${price}&maxGroupSize=${maxGroupSize}`);

        if(!res.ok) alert('Something went wrong');

        const result = await res.json ();

        navigate(`/tours/search?city=${title}&price=${price}&maxGroupSize=${maxGroupSize}`, {state: result.data});
    };

    return <Col lg='12'>
        <div className="search__bar">
            <Form className="d-flex align-items-center gap-4">
                <FormGroup className="d-flex gap-3 form__group form__group-fast">
                    <span><i class="ri-map-pin-line"></i></span>
                    <div>
                        <h6>Location</h6>
                        <input type= "text" placeholder="Where are you going?" ref={titleRef}/>
                    </div>
                </FormGroup>
                <FormGroup className="d-flex gap-3 form__group form__group-fast">
                    <span><i class="ri-money-dollar-box-line"></i></span>
                    <div>
                        <h6>Price</h6>
                        <input type= "number" placeholder="price" ref={priceRef}/>
                    </div>
                </FormGroup>
                <FormGroup className="d-flex gap-3 form__group form_group-last">
                    <span><i class="ri-group-line"></i></span>
                    <div>
                        <h6>Max people</h6>
                        <input type= "number" placeholder="0" ref={maxGropuSizeRef}/>
                    </div>
                </FormGroup>
                <span className="search__icon" type='submit' onClick={searchHandler}>
                    <i class="ri-search-line"></i>
                </span>
            </Form>
        </div>
    </Col>
}

export default SearchBar
