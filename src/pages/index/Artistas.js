import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const Artistas = () => {
    const { id } = useParams();

    const [artistaList, setArtistaList] = useState([]);
    useEffect(() => {
        if (id) {
            fetchArtistas();
        }
    }, []);

    const fetchArtistas = () => {
        axios.get('http://localhost:8081/spotify/?controller=artista&action=listByGenero&id=' + id)
            .then(response => {
                const artistas = response.data;
                setArtistaList(artistas);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <Container>
        {artistaList.length === 0 && <h1 className="text-center">Este album no tiene artistas</h1>}
            <Row xs={1} md={2} className="g-4">
                {artistaList.map((artista) => {
                    return (
                        <Col key={artista.id}>
                            <Link className="text-center text-decoration-none text-black" to={'/listaAlbumes/' + artista.id}>
                                <Card>
                                    <Card.Img variant="top" src={'http://localhost:8081/spotify/perfil/' + artista.id + ".jpg"} height="160" />
                                    <Card.Body>
                                        <Card.Title className="text-center">{artista.nombre}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default Artistas;
/*



    const [albumList, setAlbumList] = useState([]);
    const mostrarAlbumes = (id) => {
        axios.get('http://localhost:8081/spotify/?controller=album&action=listByArtista&id=' + id)
            .then(response => {
                const albumes = response.data;
                setAlbumList(albumes);
            }).catch(error => {
                console.log(error);
            });
    }

    const [showResults, setShowResults] = useState(false)
    const onClick = () => setShowResults(true)
    const MostrarArtistas = () => {

    }

<Container>
            <Card.Body>
                <h1 className="text-center">Artistas del Genero</h1>
            </Card.Body>
            <Row xs={1} md={1} className="g-4">
                {artistaList.map((artista) => {
                    return (
                        <Col>
                            <Link className="text-center text-decoration-none text-black" onClick={onClick}>
                                <Card>
                                    <Card.Img variant="top" src={'http://localhost:8081/spotify/caratula/' + artista.id + ".jpg"} height="160" />
                                    <Card.Body>
                                        <Card.Title className="text-center">{artista.nombre}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    );
                })}
            </Row>
            {showResults ?
                axios.get('http://localhost:8081/spotify/?controller=album&action=listByArtista&id=' + id)
                    .then(response => {
                        const albumes = response.data;
                        <Container>
                            <Row xs={1} md={1} className="g-4">
                                {albumes.map((artista) => {
                                    return (
                                        <Col>
                                            <Link className="text-center text-decoration-none text-black">
                                                <Card>
                                                    <Card.Img variant="top" src={'http://localhost:8081/spotify/audio/' + artista.id + ".jpg"} height="160" />
                                                    <Card.Body>
                                                        <Card.Title className="text-center">{artista.nombre}</Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Container>
                    }).catch(error => {
                        console.log(error);
                    })
                : null}
        </Container>
*/