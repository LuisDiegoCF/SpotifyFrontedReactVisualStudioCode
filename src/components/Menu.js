import React from "react"; // imr
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
const Menu = () => { //sfc
    return (
        <Navbar bg="dark" expand="md" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Spotify logo"
                    />
                    Spotify
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Generos" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/generos">
                                Lista de Generos
                            </Link>
                            <Link className="dropdown-item" to="/generos/create">
                                Crear Genero
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Artistas" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/artistas">
                                Lista de Artistas
                            </Link>
                            <Link className="dropdown-item" to="/artistas/create">
                                Crear Artista
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Albumes" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/albumes">
                                Lista de Albumes
                            </Link>
                            <Link className="dropdown-item" to="/albumes/create">
                                Crear Album
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Canciones" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/canciones">
                                Lista de Canciones
                            </Link>
                            <Link className="dropdown-item" to="/canciones/create">
                                Crear Cancion
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;