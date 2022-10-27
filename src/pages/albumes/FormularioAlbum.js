import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioAlbum = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [idArtista, setIdArtista] = useState('');
    const [listaArtistas, setListaArtistas] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        fetchListaArtistas();
        if (id) {
            fetchAlbumByid();
        }
    }, []);

    const fetchListaArtistas = () => {
        axios.get('http://localhost:8081/spotify/?controller=artista&action=list')
            .then(response => {
                setListaArtistas(response.data);
                if(response.data.length > 0){
                    setIdArtista(response.data[0].id);
                }
            }).catch(error => {
                console.log(error);
            });
    }

    const fetchAlbumByid = () => {
        axios.get('http://localhost:8081/spotify/?controller=album&action=detail&id=' + id)
            .then(response => {
                const album = response.data;
                setNombre(album.nombre);
                setIdArtista(album.idArtista);
            }).catch(error => {
                console.log(error);
            });
    }

    const onChangeArtista = (e) => {
        setIdArtista(e.target.value);
    }

    const saveAlbum = () => {
        const album = {
            "nombre": nombre,
            "idArtista": idArtista
        }
        if (id) {
            doUpdate(album);
        } else {
            doCreate(album);
        }
    }

    const doUpdate = (album) => {
        axios.put('http://localhost:8081/spotify/?controller=album&action=update&id=' + id, album)
            .then(response => {
                navigate('/albumes');
            }).catch(error => {
                console.log(error);
            });
    }

    const doCreate = (album) => {
        axios.post('http://localhost:8081/spotify/?controller=album&action=store', album)
            .then(response => {
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
        setValidated(true);
        saveAlbum();
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title><h1>Formulario Album</h1></Card.Title>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <div>
                                    <div>
                                        <label>Nombre:</label>
                                        <input className="form-control" type="text"
                                            value={nombre} required
                                            onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            El nombre es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Id Artista:</label>
                                        {/*<input className="form-control" type="text"
                                        value={idArtista}
    onChange={(e) => setIdArtista(e.target.value)} />*/}
                                        <FormSelect onChange={onChangeArtista} value={idArtista}>
                                            {listaArtistas.map((artista) => (
                                                <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                                            ))}
                                        </FormSelect>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary mt-3" type="submit">Guardar</button>
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

export default FormularioAlbum;