import { Switch, Route } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import Users from "../ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    home
                </Route>
                <Route path="*">
                    404 not found
                </Route>
            </Switch>
        </>
    )
}

export default AppRoutes