import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResidentDashboard from './residents/Dashboard';
import Complaints from './residents/Complaints';
import Payment from './residents/Payment';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/residents/dashboard" component={ResidentDashboard} />
                <Route path="/residents/complaints" component={Complaints} />
                <Route path="/residents/payment" component={Payment} />
                {/* ...other routes... */}
            </Switch>
        </Router>
    );
}

export default App;