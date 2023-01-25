import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { Container, Row, Col,  Badge, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css";
import Loading from './Loading'
// import { useAddToCartMutation } from '../services/appApi'
// import SimilarProduct from '../components/SimilarProduct'
import './ProductPage.css'
import { LinkContainer} from "react-router-bootstrap"
// import ToastMessage from "../components/ToastMessage"


function ProductPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    // const [similar, setSimilar] = useState(null);
    // const [addToCart, { isSuccess }] = useAddToCartMutation();

    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            // setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }

    // const responsive = {
    //     0: { items: 1 },
    //     568: { items: 2 },
    //     1024: { items: 3 },
    // };

    const images = product.pictures.map((picture) => <img className="product_carousel_image" src={picture.url} alt="product" onDragStart={handleDragStart} />);

    return (
        <Container className="pt-4" style={{ position: "relative" }}>
            <Row>
                <Col lg={6}>
                    <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" />
                </Col>
                <Col lg={6} className="pt-4">
                    <h1 style={{color:"#DA9100"}}>HAPPY BIRTHDAY TO YOU</h1>
                    <p>
                        <Badge bg="primary">{product.category}</Badge>
                    </p>

                    <p style={{ textAlign: "justify", color:"#DA9100"}} className="py-3">
                        <strong>Message from {product.name.toUpperCase()}:</strong><br></br> <br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;  {product.description.toUpperCase()}
                    </p>

                    <p style={{ textAlign: "justify", color:"#DA9100"}} className="py-3">
                        <strong>About you by {product.name.toUpperCase()} in a single line:</strong><br></br> <br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;  {product.word}
                    </p>
                                  
                </Col>
            </Row>
         
        </Container>
    );
}

export default ProductPage