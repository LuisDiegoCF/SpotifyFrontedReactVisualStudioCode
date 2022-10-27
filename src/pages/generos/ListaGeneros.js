import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaGeneros = () => {
    const [generoList, setGeneroList] = useState([]);
    useEffect(() => {
        fetchGeneros();
    }, []);
    const fetchGeneros = () => {
        axios.get('http://localhost:8081/spotify/?controller=genero&action=list')
            .then(response => {
                setGeneroList(response.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminarGenero = (id) => {
        if (!window.confirm('¿Estas seguro de eliminar este genero?')) {
            return;
        }
        axios.delete('http://localhost:8081/spotify/?controller=genero&action=delete&id=' + id)
            .then(response => {
                fetchGeneros();
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
                            <h1>Lista de Generos</h1>
                        </Card.Body>
                        <div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Caratula</th>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {generoList.map((genero) => {
                                        return (
                                            <tr key={genero.id}>
                                                <td>
                                                    <img src={'http://localhost:8081/spotify/caratula/' + genero.id + ".jpg"} alt="foto" width="50" height="50" />
                                                </td>
                                                <td>{genero.id}</td>
                                                <td>{genero.nombre}</td>
                                                <td>
                                                    <Link className='btn btn-primary' to={"/generos/" + genero.id}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link className='btn btn-secondary' to={"/generos/" + genero.id + "/foto"}>
                                                        Subir Foto
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => {
                                                        eliminarGenero(genero.id);
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

export default ListaGeneros;