import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login/index';
import SingUp from '../pages/SingUp/index';
import About from '../pages/About/index';
import ScalesListing from '../pages/ScalesListing/index';
import NewScale from '../pages/NewScale/index';
import InformationScale from '../pages/InformationScale/index';
import InformationScalePeople from '../pages/InformationScalePeople/index';
import ListAdms from '../pages/ListAdms/index';
import NewAdm from '../pages/NewAdm/index';
import ChangePassword from '../pages/ChangePassword/index';
import Questions from '../pages/Questions/index';
import EditScale from  '../pages/EditScale/index'
import { isAuthenticatedPeople, isAuthenticatedAdm } from '../service/Auth';


const PrivateRouteAdm = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticatedAdm() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);


const PrivateRoutePeople = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticatedPeople() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const NotFound = () => <div>NOT FOUND</div>

const Routes = () => {

    return isAuthenticatedPeople() === false && isAuthenticatedAdm() ? (

        <Switch>
            <Route path="/" exact={true} component={ScalesListing} />
            <Route path="/about" component={About} />
            <Route path="/scale/:id" component={InformationScale} />
            <Route path="/change_password" component={ChangePassword} />
            <Route path="/questions" component={Questions} />

            <PrivateRouteAdm path="/new_scale" component={NewScale} />
            <PrivateRouteAdm path="/edit_scale/:id" component={EditScale} />
            <PrivateRouteAdm path="/adm" component={ListAdms} />
            <PrivateRouteAdm path="/new_adm" component={NewAdm} />

            <Route component={NotFound} />
        </Switch>

    ) : isAuthenticatedPeople() && isAuthenticatedAdm() === false ? (
        <Switch>
            <Route path="/" exact={true} component={ScalesListing} />
            <Route path="/about" component={About} />
            <Route path="/scale/:id" component={InformationScalePeople} />
            <Route path="/change_password" component={ChangePassword} />
            <Route path="/questions" component={Questions} />

            <Route component={NotFound}/>
        </Switch>
    ) : (
                <Switch>
                    <Route path="/" exact={true} component={ScalesListing} />
                    <Route path="/login" exact={true} component={Login} />
                    <Route path="/signUp" component={SingUp} />
                    <Route path="/about" component={About} />

                    <Route component={NotFound} />
                </Switch>
            )




}


export default Routes;
