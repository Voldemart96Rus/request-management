import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = ({history}) => {
    const [currentURL, setCurrentURL] = useState(history.location.pathname);
    useEffect(() => {
        setCurrentURL(history.location.pathname);
    }, [history.location.pathname]);
    const setActive = (navLink) => (navLink === currentURL ? 'active' : '');
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Менеджер заявок</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link
                                href="/requests"
                                className={setActive('/requests')}
                            >
                                Просмотр заявок
                            </Nav.Link>
                            <Nav.Link
                                href="/create-request"
                                className={setActive('/create-request')}
                            >
                                Создание заявок
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default withRouter(Header);
