import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const AlbumFoto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imagen, setImagen] = useState(null);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const uploadPhoto = () => {
        const formData = new FormData();
        formData.append("imagen", imagen);
        axios.post('http://localhost:8081/spotify/?controller=album&action=photo&id=' + id,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            navigate('/albumes');
        }).catch(error => {
            console.log(error);
        });
    }

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        const allErrors = {};
        if (imagen.type !== 'image/jpeg') {
            allErrors.imagen = 'La imagen debe ser JPG';
        }
        setErrors(allErrors);
        setValidated(true);
        if (Object.keys(allErrors).length > 0) {
            return;
        }
        uploadPhoto();
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title><h1>Foto de Album</h1></Card.Title>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <div>
                                    <div>
                                        <label>Seleccion su Foto:</label>
                                        <FormControl type="file" isInvalid={!!errors.imagen} required accept=".jpg" className="form-control" onChange={(e) => {
                                            setImagen(e.target.files[0]);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.imagen}
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <Button className='mt-2' type='submit'>Subir foto</Button>
                                    </div>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AlbumFoto;