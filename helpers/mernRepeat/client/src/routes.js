import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import CreatePage from "./pages/CreatePage/CreatePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DetailPage from "./pages/DetailPage";
import LinksPage from "./pages/LinksPage/Links";


const Routes = ({ isAuthenticated }) => {
    if ( isAuthenticated ) {
        return (
            <Switch>
                <Route path="/links" exact render={() => <LinksPage/>} />
                <Route path="/create" exact render={() => <CreatePage/>} />
                <Route path="/details/:id" render={() => <DetailPage/>} />
                <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact render={() => <AuthPage/>} />
            <Redirect to="/" />
        </Switch>
    );
}

export default Routes
