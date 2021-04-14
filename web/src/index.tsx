import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signup from './components/auth/signup.component';
import './index.css';

function App() {
    return(
        <BrowserRouter>
            <div className='auth-inner'>
                <Switch>
                    <Route exact path='/' component={Signup} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
