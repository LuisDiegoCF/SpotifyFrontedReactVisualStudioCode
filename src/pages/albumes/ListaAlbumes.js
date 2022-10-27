import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaAlbumes = () => {
    const [albumList, setAlbumList] = useState([]);
    useEffect(() => {
        fetchAlbumList();
    }, []);
    const fetchAlbumList = () => {
        axios.get('http://localhost:8081/spotify/?controller=album&action=list')
            .then(response => {
                const albumList = response.data;
                setAlbumList(albumList);
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminarAlbum = (id) => {
        if (!window.confirm('¿Estas seguro de eliminar este genero?')) {
            return;
        }
        axios.delete('http://localhost:8081/spotify/?controller=album&action=delete&id=' + id)
            .then(response => {
                fetchAlbumList();
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
                            <h1>Lista de Albumes</h1>
                        </Card.Body>
                        <div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Artista</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {albumList.map((album) => {
                                        return (
                                            <tr key={album.id}>
                                                <td>
                                                    <img src={'http://localhost:8081/spotify/album/' + album.id + ".jpg"} alt="foto" width="50" height="50" />
                                                </td>
                                                <td>{album.id}</td>
                                                <td>{album.nombre}</td>
                                                <td>{album.artista.nombre}</td>
                                                <td>
                                                    <Link className='btn btn-primary' to={"/albumes/" + album.id}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link className='btn btn-secondary' to={"/albumes/" + album.id + "/foto"}>
                                                        Subir Foto
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => {
                                                        eliminarAlbum(album.id);
                                                    }}>
                                                        Eliminar
                                                    </Button>
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

export default ListaAlbumes;