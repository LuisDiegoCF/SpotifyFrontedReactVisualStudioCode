import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
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

  return (
    <Container>
      <Card.Body>
        <h1 className="text-center">Generos</h1>
      </Card.Body>
      <Row xs={1} md={4} className="g-4">
        {generoList.map((genero) => {
          return (
            <Col key={genero.id}>
              <Link className="text-center text-decoration-none text-black" to={'/listaGeneros/' + genero.id}>
                <Card>
                  <Card.Img variant="top" src={'http://localhost:8081/spotify/caratula/' + genero.id + ".jpg"} height="160" />
                  <Card.Body>
                    <Card.Title className="text-center">{genero.nombre}</Card.Title>
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

export default ListaGeneros;