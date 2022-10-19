import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu() {
  return (
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand href="#home">Ativy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Clientes</Nav.Link>
            <Nav.Link href="#link">Atividades</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown align='end' title="Rodolfo" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Configurações</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
                Sair
            </NavDropdown.Item>
            </NavDropdown>
           </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;