import React, { useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../axios';
import { useDispatch, useSelector } from "react-redux";
import ProductPreview from './ProductPreview';
import { updateProducts } from '../features/productSlice';
import photo from '../images/photo.jpg';
import './home.css';
import song from '../audios/birthday.mp3';

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 6);

    useEffect(() => {
        axios.get('/products').then(({ data }) => dispatch(updateProducts(data)));
     
    },[dispatch]);

  return (
    <>
    <Container>
        <Row className="home">
        <Col md={6} >
         <img className="photo" src= {photo} alt="photo" />
         <audio className="control" controls loop autoPlay >
          <source src={song} type="audio/mp3"/>
         </audio>
        </Col> 
        <Col md={6} className='message' style={{ backgroundColor: "#FFFF00"}}>
          <h2 className='heading'>Hi!!! <br></br>Have a Great Year Ahead!!! <br></br>With the Wishes from your Besties!!!</h2>
     {/* last messages here --> comes from the backend */}
    {/*    <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div> */}
      
    {/*   <div style={{ backgroundColor: "#FFFF00"}}>
                    <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>
                        See more {">>"}
                    </Link>
                </div> */}
      {/* </div> */}
               </Col>  
            </Row>
            </Container>
            </>
  )
}

export default Home
