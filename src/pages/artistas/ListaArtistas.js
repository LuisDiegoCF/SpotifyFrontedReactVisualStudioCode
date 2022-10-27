import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaArtistas = () => {
    const [artistaList, setArtistas] = React.useState([]);
    useEffect(() => {
        fetchArtistas();
    }, []);
    const fetchArtistas = () => {
        axios.get('http://localhost:8081/spotify/?controller=artista&action=list')
            .then(response => {
                setArtistas(response.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminarArtista = (id) => {
        if(!window.confirm('¿Está seguro de eliminar el artista?')){
            return;
        }
        axios.delete('http://localhost:8081/spotify/?controller=artista&action=delete&id=' + id
        ).then(response => {
            fetchArtistas();
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
                            <h1>Lista de Artistas</h1>
                        </Card.Body>
                        <div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Perfil</th>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Genero</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {artistaList.map((artista) => {
                                        return (
                                            <tr key={artista.id}>
                                                <td>
                                                    <img src={'http://localhost:8081/spotify/perfil/' + artista.id + ".jpg"} alt="foto" width="50" height="50" />
                                                </td>
                                                <td>{artista.id}</td>
                                                <td>{artista.nombre}</td>
                                                <td>{artista.genero.nombre}</td>
                                                <td>
                                                    <Link className='btn btn-primary' to={"/artistas/" + artista.id}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link className='btn btn-secondary' to={"/artistas/" + artista.id + "/foto"}>
                                                        Subir Foto
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => {
                                                        eliminarArtista(artista.id);
                                                    }}>
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
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

export default ListaArtistas;