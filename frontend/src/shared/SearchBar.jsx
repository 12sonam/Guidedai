import React, {useRef} from "react";
import './search-bar.css'
import { Col, Form, FormGroup} from "reactstrap"

const SearchBar = () => {

    const locationRef = useRef(' ')
    const budgetRef = useRef(0)
    const maxGropuSizeRef = useRef(0)

    const searchHandler = () => {

        const location = locationRef.current.value
        const budget = budgetRef.current.value
        const maxGropuSize = maxGropuSizeRef.current.value

        if(location==='' || budget ==='' || maxGropuSize===''){
            return alert('All fields are required!');
        }
    }

    return <Col lg='12'>
        <div className="search__bar">
            <Form className="d-flex align-items-center gap-4">
                <FormGroup className="d-flex gap-3 form__group form__group-fast">
                    <span><i class="ri-map-pin-line"></i></span>
                    <div>
                        <h6>Location</h6>
                        <input type= "text" placeholder="Where are you going?" ref={locationRef}/>
                    </div>
                </FormGroup>
                <FormGroup className="d-flex gap-3 form__group form__group-fast">
                    <span><i class="ri-money-dollar-box-line"></i></span>
                    <div>
                        <h6>Budget</h6>
                        <input type= "number" placeholder="Budget" ref={budgetRef}/>
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
