import { NavLink } from 'react-router-dom'
import './Login.scss'

const Login = (props) => {
    return (
        <div className="container col-sm-5 xm-auto mt-5">
            <h2 className="text-center mb-3">Login</h2>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
            </div>
            <div className="bot-login">
                <NavLink to="/register">Create new a count</NavLink>
                <button className="mt-3 btn btn-primary">Login</button>
            </div>
        </div>
    )
}

export default Login