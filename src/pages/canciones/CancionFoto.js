import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const CancionFoto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imagen, setImagen] = useState(null);
    const uploadPhoto = () => {
        const formData = new FormData();
        formData.append("imagen", imagen);
        axios.post('http://localhost:8081/spotify/?controller=cancion&action=photo&id=' + id,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            navigate('/canciones');
        }).catch(error => {
            console.log(error);
        });
    }

    return ( 
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title><h1>Foto de Cancion</h1></Card.Title>
                            
                                <div>
                                    <label>Seleccion su Foto:</label>
                                    <input accept=".jpg" className="form-control" type="file" onChange={(e) => {
                                        setImagen(e.target.files[0]);
                                    }}/>
                                </div>
                                <div>
                                    <Button className='mt-2' onClick={uploadPhoto}>Subir foto</Button>
                                </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>   
    );
}

export default CancionFoto;