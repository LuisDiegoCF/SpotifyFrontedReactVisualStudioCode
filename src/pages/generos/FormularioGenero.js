import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioGenero = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (id) {
            fetchGeneroByid();
        }
    }, []);

    const fetchGeneroByid = () => {
        axios.get('http://localhost:8081/spotify/?controller=genero&action=detail&id=' + id)
            .then(response => {
                const genero = response.data;
                setNombre(genero.nombre);
            }).catch(error => {
                console.log(error);
            });
    }

    const saveGenero = (e) => {
        e.preventDefault();
        const genero = {
            "nombre": nombre
        }
        if (id) {
            doUpdate(genero);
        } else {
            doCreate(genero);
        }
    }

    const doUpdate = (genero) => {
        axios.put('http://localhost:8081/spotify/?controller=genero&action=update&id=' + id, genero)
            .then(response => {
                navigate('/generos');
            }).catch(error => {
                console.log(error);
            });
    }

    const doCreate = (genero) => {
        axios.post('http://localhost:8081/spotify/?controller=genero&action=store', genero)
            .then(response => {
                navigate('/generos');
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
                            <Card.Title><h1>Formulario Genero</h1></Card.Title>
                            <div>
                                <div>
                                    <label>Nombre:</label>
                                    <input className="form-control" type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div>
                                    <button className="btn btn-primary mt-3" onClick={saveGenero}>Guardar</button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FormularioGenero;