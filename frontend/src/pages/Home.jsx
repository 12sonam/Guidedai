import React from "react"; 
import '../styles/home.css'

import { Container, Row, Col} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
import experienceImg from '../assets/images/experience.png';

import Subtitle from './../shared/Subtitle';

import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";

const Home = () => {
    return <>

    {/* ======= hero section start ======== */}
    <section>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="hero__content">
                    <div className="hero__subtitle d-flex align-items-center ">
                        <Subtitle subtitle={'GuideDai for travelling'}/>
                        <img src={worldImg} alt="" />
                    </div>
                    <h1>Travelling opens the door to creating <span className="highlight"> memories</span></h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae maxime alias consequatur eius hic soluta odio inventore, aut nostrum consectetur iure! Esse unde voluptas illum quasi error quis, et officia.
                    </p>
                    </div>
                </Col>

                <Col lg='2'>
                    <div className="hero__img-box">
                        <img src={heroImg} alt=""></img>
                    </div>
                </Col>
                <Col lg='2'>
                    <div className="hero__img-box mt-4">
                        <video src={heroVideo} alt="" controls/>
                    </div>
                </Col>
                <Col lg='2'>
                    <div className="hero__img-box mt-5">
                        <img src={heroImg02} alt=""></img>
                    </div>
                </Col>
                <SearchBar/>
            </Row>
        </Container>
    </section>
    {/* ======= hero section start ======== */}
    <section>
        <Container>
            <Row>
                <Col lg='3'> 
                    <h5 className="services__subtitle">What we serve</h5>
                    <h2 className="services__title">We offer our best services</h2>
                </Col>
                <ServiceList />
            </Row>
        </Container>
    </section>


    {/* =========== featured tour section start ============== */}
    <section>
        <Container>
            <Row>
                <Col lg='12' className="mb-5">
                    <Subtitle subtitle={'Expolore'}/>
                    <h2 className="featured__tour-title">Our featured tours</h2>
                </Col>
                <FeaturedTourList />
            </Row>
        </Container>
    </section>
    {/* =========== featured tour section end ============== */}

    {/* ============ experience section start ===============*/}
    <section>
        <Container>
            <Row>
                <Col lg='6'>
                <div className="experience__content">
                    <Subtitle subtitle={'Experience'}/>

                    <h2>With out all experience <br />we will server you </h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>

                <div className="counter__wrapper d-flex align-items-center gap-5">
                    <div className="counter__box">
                        <span>12k+</span>
                        <h6>Successfull trip</h6>
                    </div>
                    <div className="counter__box">
                        <span>2k+</span>
                        <h6>Regular clients</h6>
                    </div>
                    <div className="counter__box">
                        <span>15</span>
                        <h6>Years experience</h6>
                    </div>
                </div>
                </Col>
                <Col lg='6'>
                    <div className="experience__img">
                        <img src={experienceImg} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
    {/* ============ experience section end ===============*/}

    {/* ============ galery section start =================*/}
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <Subtitle subtitle={'Gallery'}/>
                    <h2 className="gallery__title">Visit our tour gallery</h2>
                </Col>
                <Col lg='12'>
                    <MasonryImagesGallery />
                </Col>
            </Row>
        </Container>
    </section>
    {/* ============ galery section end =================*/}

    {/* ============ testimonial section start =================*/}
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <Subtitle subtitle={'Customer Love'}/>
                    <h2 className="testimonial__title">What our customer says about us</h2>
                </Col>
            </Row>
        </Container>
    </section>
    {/* ============ testimonial section end =================*/}
    </>
};

export default Home;
