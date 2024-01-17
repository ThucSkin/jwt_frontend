import { NavLink, useHistory } from 'react-router-dom';
import './Register.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUsers } from '../../services/userService';

const Register = (props) => {
    let history = useHistory();

    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidPasswordConfirm: true
    }

    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const checkValidate = () => {
        setObjCheckInput(defaultValidInput);

        // Kiểm tra các trường có giá trị không được để trống
        if (!formData.email.trim()) {
            toast.error('email is required')
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false
        }
        if (!formData.username.trim()) {
            toast.error('username is required')
            setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
            return false
        }
        if (!formData.phone.trim()) {
            toast.error('phone is required')
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false
        }
        if (!formData.password.trim()) {
            toast.error('password is required');
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false; // Exit early if the password is missing
        }

        if (formData.password.trim().length < 4) {
            toast.error('Mật khẩu phải lớn hơn 3 kí tự trở lên');
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false; // Exit if the password is too short
        }
        if (!formData.confirmPassword.trim()) {
            toast.error('confirmPassword is required')
            setObjCheckInput({ ...defaultValidInput, isValidPasswordConfirm: false });
            return false
        }
        if (formData.confirmPassword.trim() !== formData.password.trim()) {
            toast.error('your password is incorrect')
            setObjCheckInput({ ...defaultValidInput, isValidPasswordConfirm: false });
            return false
        }
        let regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regx.test(formData.email)) {
            toast.error('Please enter a valid email')
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false
        }

        return true
    }

    const handleRegister = async () => {
        let check = checkValidate();
        let { email, password, username, phone } = formData;

        if (check === true) {
            const data = {
                email,
                password,
                username,
                phone,
            };
            const response = await createUsers(data);
            if (response && response.errCode === 0) {
                history.push('/login');
                toast.success(response.errMsg);
            } else if (response && response.errCode === 1) {
                toast.error(response.errMsg);
            }
        }
    };



    return (
        <div className="container col-sm-5 xm-auto mt-5">
            <h2 className="text-center mb-3">Register</h2>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                    id="floatingInput"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <label htmlFor="floatingPassword">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                <label htmlFor="floatingPassword">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                    id="floatingPassword"
                    name="password"
                    minLength={4}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating">
                <input
                    type="password"
                    className={objCheckInput.isValidPasswordConfirm ? 'form-control' : 'form-control is-invalid'}
                    name="confirmPassword"
                    placeholder="Re-password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
                <label htmlFor="floatingPassword">Re-password</label>
            </div>
            <div className="bot-register">
                <NavLink to="/login">Have an account? Login</NavLink>
                <button onClick={handleRegister} className="mt-3 btn btn-primary">Register</button>
            </div>
        </div>
    );
};

export default Register;
