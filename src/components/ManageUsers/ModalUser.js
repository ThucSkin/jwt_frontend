
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUser.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchGroup, createUsers, editUserById } from '../../services/userService';
import _ from 'lodash';

const ModalUser = (props) => {
    const { action, dataModalUser } = props;

    const defaultUser = {
        id: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: 'Male',
        group: '2'
    }
    const [userData, setUserData] = useState(defaultUser);
    const [userGroup, setUserGroup] = useState([]);

    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true,
        isValidUsername: true,
        isValidAddress: true,
        isValidPhone: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    const checkValidate = () => {
        const errors = { ...defaultValidInput };
        const fields = ['email', 'password', 'username', 'phone', 'address'];

        if (action === 'UPDATE') return true;

        for (const field of fields) {
            if (!userData[field].trim()) {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                errors[`isValid${field.charAt(0).toUpperCase() + field.slice(1)}`] = false;
            } else if (field === 'email') {
                let regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                if (!regx.test(userData[field])) {
                    toast.error('Please enter a valid email');
                    errors.isValidEmail = false;
                }
            } else if (field === 'password' && userData[field].trim().length < 4) {
                toast.error('Password must be at least 4 characters long');
                errors.isValidPassword = false;
            }
        }

        setObjCheckInput(errors);

        return Object.values(errors).every((isValid) => isValid);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        });
    };

    useEffect(() => {
        getGroups();
    }, []);

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' });

        }
    }, [dataModalUser]);

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroup && userGroup.length > 0) {
                setUserData({ ...userData, group: userGroup[0].id });
            }
        }
    }, [action]);

    const getGroups = async () => {
        let res = await fetchGroup();

        if (res && res.errCode === 0) {
            setUserGroup(res.data);
        } else {
            toast.error(res.errMsg);
        }
    }

    const handleSave = async () => {
        let check = checkValidate();

        if (check === true) {
            let res = action === 'CREATE' ? await createUsers({
                ...userData,
                groupId: userData[`group`],
                sex: userData[`sex`],
            })
                : await editUserById({
                    ...userData,
                    groupId: userData[`group`],
                    sex: userData[`sex`],
                });

            if (res && res.errCode === 0) {
                setUserData({ ...defaultUser, });
                props.onHide();
                toast.success(res.errMsg);
            } else if (res && res.errCode === 1) {
                toast.error(res.errMsg);
            }
        }
    }

    const handlePressEnter = (e) => {
        if (e.code === 'Enter') {
            handleSave();
        }
    }

    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUser);
        setObjCheckInput(defaultValidInput);
    }

    return (
        <>
            <Modal size='lg' show={props.show} onHide={() => handleCloseModalUser()} className='modal-user-container'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{props.action === 'CREATE' ? 'Create new user' : 'Edit user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body row">
                        <div className="col-sm-6 form-group">
                            <input name='id' value={userData.id} hidden />
                            <label>Email (<span className='red'>*</span>) :</label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                type="email"
                                className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                value={userData.email}
                                name='email'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Phone number (<span className='red'>*</span>) :</label>
                            <input
                                type="text"
                                className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                value={userData.phone}
                                name='phone'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Username (<span className='red'>*</span>) :</label>
                            <input
                                type="text"
                                className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                                value={userData.username}
                                name='username'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            {action === 'CREATE' &&
                                <>
                                    <label>Password (<span className='red'>*</span>) :</label>
                                    <input
                                        type="password"
                                        className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                        value={userData.password}
                                        name='password'
                                        onChange={handleInputChange}
                                    />
                                </>
                            }
                        </div>
                        <div className="col-sm-12 form-group">
                            <label>Address (<span className='red'>*</span>) :</label>
                            <input
                                type="text"
                                className={objCheckInput.isValidAddress ? 'form-control' : 'form-control is-invalid'}
                                value={userData.address}
                                name='address'
                                onChange={handleInputChange}
                                onKeyPress={(e) => handlePressEnter(e)}
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Gender (<span className='red'>*</span>) :</label>
                            <select value={userData.sex} onChange={handleInputChange} name='sex' className="form-select">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Group (<span className='red'>*</span>) :</label>
                            <select value={userData.group} onChange={handleInputChange} name='group' onKeyPress={(e) => handlePressEnter(e)} className="form-select">
                                {userGroup.length > 0 &&
                                    userGroup.map(item => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;