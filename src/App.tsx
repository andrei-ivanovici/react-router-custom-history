import React from 'react';
import './App.css';
import {Router, Switch, Route} from 'react-router';
import {Main} from "./Pages/Main";
import {Details} from "./Pages/Details";
import {Link} from "react-router-dom";
import {createCustomHistory} from "./history/custom-history";

const memHistory = createCustomHistory();

function App() {
    return <Router history={memHistory}>
        <div>

            <h1> Home</h1>
            <div className={"header"}>
                <div className={"go"} onClick={() => memHistory.goBack()}>
                    {"<="}
                </div>
                <div className={"go"} onClick={() => memHistory.goForward()}>
                    {"=>"}
                </div>
                <Link to={"/"}>
                    main
                </Link>
                <Link to={"/details"}>
                    details
                </Link>
                <div className={"go"} onClick={() => memHistory.push("/details")}>
                    goDetails
                </div>

            </div>
        </div>
        <div className={"details"}>
            <Switch>
                <Route path={"/details"} render={() => <Details/>}/>
                <Route path={"/"} render={() => <Main/>}/>
            </Switch>
        </div>
    </Router>;
}

export default App;
