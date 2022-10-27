import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const CancionAudio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [audio, setAudio] = useState('');
    const uploadAudio = () => {
        const formData = new FormData();
        formData.append("audio", audio);
        axios.post('http://localhost:8081/spotify/?controller=cancion&action=audio&id=' + id,
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
                            <Card.Title><h1>Audio de Cancion</h1></Card.Title>

                            <div>
                                <label>Seleccion su Canción:</label>
                                <input accept=".mp3" className="form-control" type="file" onChange={(e) => {
                                    setAudio(e.target.files[0]);
                                }} />
                            </div>
                            <div>
                                <Button className='mt-2' onClick={uploadAudio}>Subir foto</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CancionAudio;