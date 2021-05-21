import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Auth from "./pages/Auth";
import Links from "./pages/Links";
import Details from "./pages/Details";
import Create from "./pages/Create";

const routes = ({isAuth}) => {
    if (isAuth) {
        return <Switch>
            <Route path="/" exact render={() => <Auth />}/>
            <Route path="/links" render={() => <Links />}/>
            <Route path="/details/:id" render={() => <Details />}/>
            <Route path="/create" render={() => <Create />}/>
            <Redirect to="/create"/>
        </Switch>
    }

    return (
        <Switch>
            <Route path="/" exact render={() => <Auth />}/>
            <Route path="/links" render={() => <Links />}/>
            <Route path="/details/:id" render={() => <Details />}/>
            <Route path="/create" render={() => <Create />}/>
            <Redirect to="/" />
        </Switch>
    )
}

export default routes
