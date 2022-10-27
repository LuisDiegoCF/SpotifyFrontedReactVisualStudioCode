import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioArtista = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [idGenero, setIdGenero] = useState('');
    const [listaGeneros, setListaGeneros] = useState([]);

    useEffect(() => {
        fetchListaGeneros();
        if (id) {
            fetchArtistaByid();
        }
    }, []);

    const fetchListaGeneros = () => {
        axios.get('http://localhost:8081/spotify/?controller=genero&action=list')
            .then(response => {
                setListaGeneros(response.data);
                if(response.data.length > 0){
                    setIdGenero(response.data[0].id);
                }
            }).catch(error => {
                console.log(error);
            });
    }

    const fetchArtistaByid = () => {
        axios.get('http://localhost:8081/spotify/?controller=artista&action=detail&id=' + id)
            .then(response => {
                const artista = response.data;
                setNombre(artista.nombre);
                setIdGenero(artista.idGenero);
            }).catch(error => {
                console.log(error);
            });
    }

    const onChangeGenero = (e) => {
        setIdGenero(e.target.value);
    }

    const saveArtista = (e) => {
        e.preventDefault();
        const artista = {
            "nombre": nombre,
            "idGenero": idGenero
        }
        if (id) {
            doUpdate(artista);
        } else {
            doCreate(artista);
        }
    }
    const doUpdate = (artista) => {
        axios.put('http://localhost:8081/spotify/?controller=artista&action=update&id=' + id, artista)
            .then(response => {
                navigate('/artistas');
            }).catch(error => {
                console.log(error);
            });
    }

    const doCreate = (artista) => {
        axios.post('http://localhost:8081/spotify/?controller=artista&action=store', artista)
            .then(response => {
                navigate('/artistas');
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
                            <Card.Title><h1>Formulario Artista</h1></Card.Title>
                            <div>
                                <div>
                                    <label>Nombre:</label>
                                    <input className="form-control" type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div>
                                    <label>Genero:</label>
                                    {/*<input className="form-control" type="text"
                                        value={idGenero}
    onChange={(e) => setIdGenero(e.target.value)} />*/}
                                    <FormSelect onChange={onChangeGenero} value={idGenero}>
                                        {listaGeneros.map((genero) => (
                                            <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                                        ))}
                                    </FormSelect>
                                </div>
                                <div>
                                    <button className="btn btn-primary mt-3" onClick={saveArtista}>Guardar</button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FormularioArtista;