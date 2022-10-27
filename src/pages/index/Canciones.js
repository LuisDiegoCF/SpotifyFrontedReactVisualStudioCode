import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Canciones = ({ id }) => {
    const [cancionList, setCancionList] = useState([]);
    useEffect(() => {
        fetchCanciones();
    }, []);
    const fetchCanciones = () => {
        axios.get('http://localhost:8081/spotify/?controller=cancion&action=listByAlbum&id=' + id)
            .then(response => {
                const canciones = response.data;
                setCancionList(canciones);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <Card>
            {cancionList.length === 0 && <h1 className="text-center">Este album no tiene canciones</h1>}
            <Row>
                {cancionList.map((cancion) => {
                    console.log(cancion.nombre);
                    return (
                        <div key={cancion.id}>
                            <Row className='text-center'>
                                <Col>
                                    <Card.Img src={'http://localhost:8081/spotify/img/' + cancion.id + ".jpg"} width='150' height='150' />
                                </Col>
                                <Col>
                                    <h1>{cancion.nombre}</h1>
                                </Col>
                                <Col>
                                    <audio controls>
                                        <source src={'http://localhost:8081/spotify/audio/' + cancion.id + ".mp3"} type="audio/mpeg" />
                                    </audio>
                                </Col>
                            </Row>
                        </div>
                    );
                })}
            </Row>
        </Card>
    );
}

export default Canciones;