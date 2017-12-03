// React
import React, { Component } from 'react'

// ReactStrap
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

class NavBar extends Component {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this)
        this.state = { isOpen: false }
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Readable</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">All Posts</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/Manoj85/reactnd-project-readable">Github</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default NavBar