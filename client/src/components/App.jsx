import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import CreateRequest from '../pages/CreateRequest';
import Header from './layout/Header';
import RequestList from '../pages/RequestList';
import RequestDetails from '../pages/RequestDetails';

import NotFound from '../pages/NotFound';
import './App.css';

const App = () => {
    return (
        <Router>
            <Header />
            <main className="my-4">
                <Container>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <Redirect to="/requests" />}
                        />
                        <Route exact path="/requests" component={RequestList} />
                        <Route
                            exact
                            path="/create-request"
                            component={CreateRequest}
                        />
                        <Route
                            exact
                            path="/request-details/:id"
                            component={RequestDetails}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </Container>
            </main>
        </Router>
    );
};

export default App;
