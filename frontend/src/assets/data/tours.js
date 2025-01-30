import tourImg01 from "../images/tour-img01.jpg";
import tourImg02 from "../images/tour-img02.jpg";
import tourImg03 from "../images/tour-img03.jpg";
import tourImg04 from "../images/tour-img04.jpg";
import tourImg05 from "../images/tour-img05.jpg";
import tourImg06 from "../images/tour-img06.jpg";
import tourImg07 from "../images/tour-img07.jpg";
import tourImg08 from "../images/tour-img08.jpg";

const tours = [
  {
    id: "01",
    title: "Annapurna Base Camp",
    city: "Pokhara",
    distance: 300,
    price: 99,
    maxGroupSize: 10,
    desc: "this is the description",
    reviews: [
      {
        name: "john doe",
        rating: 4.6,
      },
      {
        name: "john doe",
        rating: 5,
      },
    ],
    avgRating: 4.5,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "02",
    title: "Everest Base Camp",
    city: "Solukhumbu",
    distance: 400,
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "john doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "03",
    title: "Upper Dolpa Trek",
    city: "Dolpa",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "john doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Langtang Valley Trek",
    city: "Rasuwa",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "john doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg04,
    featured: true,
  },
  {
    id: "05",
    title: "Manaslu Circuit Trek",
    city: "Gorkha",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "john doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "06",
    title: "Rara Lake Trek",
    city: "Mugu",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "john doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "07",
    title: "Gosaikunda Trek",
    city: "Rasuwa",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg07,
    featured: false,
  },
  {
    id: "08",
    title: "Mardi Himal Trek",
    city: "Pokhara",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      
    ],
    avgRating: 4.5,
    photo: tourImg08,
    featured: false,
  },
];

export default tours;
