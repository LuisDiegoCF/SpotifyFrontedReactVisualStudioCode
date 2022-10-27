import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Canciones from "./Canciones";

const Albumes = () => {
  const { id} = useParams();
  const [albumList, setAlbumList] = useState([]);
  useEffect(() => {
    if (id) {
      fetchAlbumes();
    }
  }, []);

  const fetchAlbumes = () => {
    axios.get('http://localhost:8081/spotify/?controller=album&action=listByArtista&id=' + id)
      .then(response => {
        const albumes = response.data;
        setAlbumList(albumes);
      }).catch(error => {
        console.log(error);
      });
  }

  return (
    <Container>
      {albumList.length === 0 && <h1 className="text-center">Este artista no tiene albumes</h1>}
      {albumList.map((album) => {
        return (
          <div  key={album.id}>
            <Card bg="dark" text="white" body className="text-center" style={{ fontFamily: "Times New Roman", fontSize: "40px"}}>
              <Card.Img variant="left" src={'http://localhost:8081/spotify/album/' + album.id + ".jpg"} width="50" height="50" />
              {album.nombre}
            </Card>
            <Canciones id={album.id} />
          </div>
        );
      })}
    </Container>
  );
};

export default Albumes;

