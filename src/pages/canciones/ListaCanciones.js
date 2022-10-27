import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaCanciones = () => {
    const [cancionList, setCancionList] = useState([]);

    useEffect(() => {
        fetchCanciones();
    }, []);

    const fetchCanciones = () => {
        axios.get('http://localhost:8081/spotify/?controller=cancion&action=list')
            .then(response => {
                setCancionList(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const eliminarCancion = (id) => {
        if (!window.confirm('¿Estas seguro de eliminar esta cancion?')) {
            return;
        }
        axios.delete('http://localhost:8081/spotify/?controller=cancion&action=delete&id=' + id)
            .then(response => {
                fetchCanciones();
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
                            <h1>Lista de Canciones</h1>
                        </Card.Body>
                        <div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Cancion</th>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Album</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cancionList.map((cancion) => {
                                        return (
                                            <tr key={cancion.id}>
                                                <td>
                                                    <img src={'http://localhost:8081/spotify/img/' + cancion.id + ".jpg"} alt="foto" width="50" height="50" />
                                                </td>
                                                <td>
                                                    <audio controls>
                                                        <source src={'http://localhost:8081/spotify/audio/' + cancion.id + ".mp3"} type="audio/mpeg" />
                                                    </audio>
                                                </td>
                                                <td>{cancion.id}</td>
                                                <td>{cancion.nombre}</td>
                                                <td>{cancion.album.nombre}</td>
                                                <td>
                                                    <Link className='btn btn-primary' to={'/canciones/' + cancion.id}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link className='btn btn-secondary' to={'/canciones/' + cancion.id + "/foto"}>
                                                        Subir Foto
                                                    </Link>
                                                </td>
                                                
                                                <td>
                                                    <Link className='btn btn-secondary' to={'/canciones/' + cancion.id + "/audio"}>
                                                        Subir Cancion
                                                    </Link>
                                                </td>
                                                <td>
                                                    <button className='btn btn-danger' onClick={() => {
                                                        eliminarCancion(cancion.id)
                                                    }}>
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ListaCanciones;