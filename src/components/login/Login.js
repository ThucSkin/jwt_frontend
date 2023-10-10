import { NavLink, useHistory } from 'react-router-dom'
import './Login.scss'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { userLoginService } from '../../services/userService';


const Login = (props) => {
    let history = useHistory();

    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
    });

    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    const checkValidate = () => {
        setObjCheckInput(defaultValidInput);

        // Kiểm tra các trường có giá trị không được để trống
        if (!formLogin.email.trim()) {
            toast.error('Email is required')
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false
        }
        let regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regx.test(formLogin.email)) {
            toast.error('Please enter a valid email')
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false
        }

        if (!formLogin.password.trim()) {
            toast.error('Password is required');
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }

        if (formLogin.password.trim().length < 4) {
            toast.error('Mật khẩu phải lớn hơn 3 kí tự trở lên');
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }

        return true
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormLogin({
            ...formLogin,
            [name]: value
        });
    };



    const handleLogin = async () => {
        let check = checkValidate();
        let { email, password } = formLogin;

        if (check === true) {
            const data = {
                email,
                password,
            };
            const response = await userLoginService(data);

            if (response && response.errCode === 0) {
                let data = {
                    isAuthenticated: true,
                    token: 'fake token'
                }
                sessionStorage.setItem('account', JSON.stringify(data));
                window.location.reload();
            } else if (response && response.errCode === 1) {
                toast.error(response.errMsg);
            }
        }
    }

    const handlePressEnter = (e) => {
        if (e.code === 'Enter') {
            handleLogin();
        }
    }

    useEffect(() => {
        let section = sessionStorage.getItem('account');
        if (section) {
            history.push('/')
            window.location.reload();
        }
    }, []);

    return (
        <div className="container col-sm-5 xm-auto mt-5">
            <h2 className="text-center mb-3">Login</h2>
            <div class="form-floating mb-3">
                <input type="email" id="floatingInput"
                    value={formLogin.email}
                    name="email"
                    onChange={handleInputChange}
                    className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                />
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" id="floatingPassword" placeholder="Password"
                    value={formLogin.password}
                    name="password"
                    onChange={handleInputChange}
                    onKeyPress={(e) => handlePressEnter(e)}
                    className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                />
                <label for="floatingPassword">Password</label>
            </div>
            <div className="bot-login">
                <NavLink to="/register">Create new a count</NavLink>
                <button onClick={() => handleLogin()} className="mt-3 btn btn-primary">Login</button>
            </div>
        </div>
    )
}

export default Login