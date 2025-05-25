import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

// import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const serviceData = [
    // {
    //     imgUrl: weatherImg,
    //     title: "Calculate Weather",
    //     desc: "Lorem ipsum dolor siti amej,akjfjk, constwmnn, elite."
    // },
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: "Explore with expert guides offering local knowledge, passion, and personalized insights for a memorable adventure tailored to your interests."
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "Tailor your trip with flexible options, adjusting itineraries and adding unique experiences to match your preferences and schedule."
    }
]


const ServiceList = () => {
    return <>
    {
        serviceData.map((item,index)=> (
        <Col lg='3' md='6' sm='12' className="mb-4" key={index}>
            <ServiceCard item={item} />
        </Col>
        ))}
    </>
}

export default ServiceList