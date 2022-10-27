import { Route, Routes } from "react-router-dom";

import Generos from "../pages/index/Generos";
import Artistas from "../pages/index/Artistas";
import Albumes from "../pages/index/Albumes";

import ListaCanciones from "../pages/canciones/ListaCanciones";
import FormularioCancion from "../pages/canciones/FormularioCancion";
import CancionFoto from "../pages/canciones/CancionFoto";
import CancionAudio from "../pages/canciones/CancionAudio";

import ListaGeneros from "../pages/generos/ListaGeneros";
import FormularioGenero from "../pages/generos/FormularioGenero";
import GeneroFoto from "../pages/generos/GeneroFoto";

import ListaArtistas from "../pages/artistas/ListaArtistas";
import FormularioArtista from "../pages/artistas/FormularioArtista";
import ArtistaFoto from "../pages/artistas/ArtistaFoto";

import ListaAlbumes from "../pages/albumes/ListaAlbumes";
import FormularioAlbum from "../pages/albumes/FormularioAlbum";
import AlbumFoto from "../pages/albumes/AlbumFoto";


const RouterConfing = () => {
    return (
        <Routes>
            <Route path="/" element={<Generos />} />
            <Route path="/listaGeneros/:id" element={<Artistas />} />
            <Route path="/listaAlbumes/:id" element={<Albumes />} />

            <Route path="/generos" element={<ListaGeneros />} />
            <Route path="/generos/create" element={<FormularioGenero />} />
            <Route path="/generos/:id" element={<FormularioGenero />} />
            <Route path="/generos/:id/foto" element={<GeneroFoto />} />

            <Route path="/canciones" element={<ListaCanciones />} />
            <Route path="/canciones/create" element={<FormularioCancion />} />
            <Route path="/canciones/:id" element={<FormularioCancion />} />
            <Route path="/canciones/:id/foto" element={<CancionFoto />} />
            <Route path="/canciones/:id/audio" element={<CancionAudio />} />

            <Route path="/artistas" element={<ListaArtistas />} />
            <Route path="/artistas/create" element={<FormularioArtista />} />
            <Route path="/artistas/:id" element={<FormularioArtista />} />
            <Route path="/artistas/:id/foto" element={<ArtistaFoto />} />

            <Route path="/albumes" element={<ListaAlbumes />} />
            <Route path="/albumes/create" element={<FormularioAlbum />} />
            <Route path="/albumes/:id" element={<FormularioAlbum />} />
            <Route path="/albumes/:id/foto" element={<AlbumFoto />} />
        </Routes>
    );
}

export default RouterConfing;