import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioCancion = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [idAlbum, setIdAlbum] = useState('');
    const [listaAlbumes, setListaAlbumes] = useState([]);

    useEffect(() => {
        fetchListaAlbumes();
        if (id) {
            fetchCancionByid();
        }
    }, []);

    const fetchListaAlbumes = () => {
        axios.get('http://localhost:8081/spotify/?controller=album&action=list')
            .then(response => {
                setListaAlbumes(response.data);
                if(response.data.length > 0){
                    setIdAlbum(response.data[0].id);
                }
            }).catch(error => {
                console.log(error);
            });
    }

    const fetchCancionByid = () => {
        axios.get('http://localhost:8081/spotify/?controller=cancion&action=detail&id=' + id)
            .then(response => {
                const cancion = response.data;
                setNombre(cancion.nombre);
                setIdAlbum(cancion.idAlbum);
            }).catch(error => {
                console.log(error);
            });
    }

    const onChangeAlbum = (e) => {
        setIdAlbum(e.target.value);
    }

    const saveCancion = (e) => {
        e.preventDefault();
        const cancion = {
            "nombre": nombre,
            "idAlbum": idAlbum
        }
        if (id) {
            doUpdate(cancion);
        } else {
            doCreate(cancion);
        }
    }

    const doUpdate = (cancion) => {
        axios.put('http://localhost:8081/spotify/?controller=cancion&action=update&id=' + id, cancion)
            .then(response => {
                navigate('/canciones');
            }).catch(error => {
                console.log(error);
            });
    }

    const doCreate = (cancion) => {
        axios.post('http://localhost:8081/spotify/?controller=cancion&action=store', cancion)
            .then(response => {
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
                            <Card.Title><h1>Formulario Canciones</h1></Card.Title>
                            <div>
                                <div>
                                    <label>Nombre</label>
                                    <input className='form-control' type='text' 
                                    value={nombre} 
                                    onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div>
                                    <label>Id Album</label>
                                    {/*<input className='form-control' type='text'
                                    value={idAlbum}
                                    onChange={(e) => setIdAlbum(e.target.value)} />*/}
                                    <FormSelect onChange={onChangeAlbum} value={idAlbum}>
                                        {listaAlbumes.map(album => (
                                            <option key={album.id} value={album.id}>{album.nombre}</option>
                                        ))}
                                    </FormSelect>
                                </div>
                                <div>
                                    <button className="btn btn-primary mt-3" onClick={saveCancion}>Guardar</button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FormularioCancion;