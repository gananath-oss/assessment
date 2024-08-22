import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Home from "../body/Body";
import ItemBody from "../item/ItemBody";
import InvoiceBody from "../invoice/InvoiceBody";

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => setExpanded(false);

  return (
    <Router>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            ABC Pharmacy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/items" onClick={handleNavClick}>
                Items
              </Nav.Link>
              <Nav.Link as={Link} to="/invoices" onClick={handleNavClick}>
                Invoice
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<ItemBody />} />
        <Route path="/invoices" element={<InvoiceBody />} />
      </Routes>
    </Router>
  );
}

export default NavBar;
