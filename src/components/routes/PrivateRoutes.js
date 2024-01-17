import { useEffect, useContext } from "react"
import { Route, useHistory } from "react-router-dom";
import { UserConText } from "../../context/UserContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoutes = (props) => {
    const { user } = useContext(UserConText);

    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        )
    } else {
        return <Redirect to='/login' />
    }
}

export default PrivateRoutes