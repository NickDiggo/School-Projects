import {useState} from 'react'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText} from 'reactstrap'
import {Link} from 'react-router-dom'

export default function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar color="dark" dark expand="md" className="px-4 sticky-top">
      {/* Logo / brand */}
      <NavbarBrand tag={Link} to="/">
        Nick Tuymans
      </NavbarBrand>

      {/* Hamburger menu voor mobiel */}
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/skills">
              Skills
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/contact">
              Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/projects">
              Projects
            </NavLink>
          </NavItem>
        </Nav>

        <NavbarText className="text-light">Welkom op mijn portfolio</NavbarText>
      </Collapse>
    </Navbar>
  )
}
