// setting for router

import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Login from './Login'
import AdminIndex from './AdminIndex'

function Main(){
    return (
        <Router>      
            <Route path="/login/" exact component={Login} />
            <Route path="/index/"  component={AdminIndex} />
            {/* <Redirect from='/' exact to='/login/'/> */}
        </Router>
    )
}
export default Main