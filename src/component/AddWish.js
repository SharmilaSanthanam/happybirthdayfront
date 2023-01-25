import React, { useState } from "react";
import { Alert, Col, Container, Nav, Form, Row, Button } from "react-bootstrap";
import { useCreateProductMutation } from "../services/appApi";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import axios from "../axios";
import date from '../images/date.png';
import './AddWish.css';

function AddWish() {
    const [name, setName] = useState("");
    const [word, setWord] = useState("");
    const [description, setDescription] = useState("");
    const [filepath, setFilepath] = useState("");
    // const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();

    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !word || !description || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({ name, word, description, filepath, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dlpwhg7qc",
                uploadPreset: "happybirthday",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (

        <Container>
            <Row>
                <Col md={6} className="add-book_form_container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4" style={{ color: "#000000" }}>Add my Birthday Wish!!! </h1>
                        {isSuccess && <Alert variant="success">Your Birthday wish is added successfully!!!</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#000000" }}>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#000000" }}>A single line that reminds me about you</Form.Label>
                            <Form.Control type="text" placeholder="Enter your words" value={word} required onChange={(e) => setWord(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#000000" }}>My Birthday Wish Message</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter the Birthday Wish Message" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button className="upload_button" type="button" style={{ backgroundColor: "#FFFF00" }} onClick={showWidget} >
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} alt="Happy Birthday To You" />
                                        {/* adding icon for removing images */}
                                        {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button className="add_wish_button" type="submit" style={{ backgroundColor: "#FFFF00" }} disabled={isLoading || isSuccess}>
                                Add My Wish
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="add-wish_image_container"></Col>
            </Row>
        </Container>
    )

}

export default AddWish;