
import { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUserPagination, deleteUserById } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    //modal delete
    const [isShowModal, setIsShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({});

    //modal update/create
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState('CREATE');
    const [dataModalUser, setDataModalUser] = useState({});

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let res = await fetchAllUserPagination(currentPage, currentLimit);

        if (res && res.errCode === 0) {
            setTotalPages(res.data.totalPages);
            setListUsers(res.data.users);
        }
    }

    const handlePageClick = async (e) => {
        setCurrentPage(+e.selected + 1)
    }


    const handleDeleteUsers = async (user) => {
        setDataModal(user);
        setIsShowModal(true);
    }

    const handleClose = () => {
        setIsShowModal(false);
        setDataModal({});
    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        setDataModalUser({});
        await fetchUsers();
    }

    const handleEditUser = (user) => {
        setActionModalUser('UPDATE');
        setDataModalUser(user);
        setIsShowModalUser(true);
    }

    const confirmDelete = async () => {
        let res = await deleteUserById(dataModal);

        if (res && res.errCode === 0) {
            toast.success(res.errMsg);
            setIsShowModal(false);
            await fetchUsers();
        } else if (res && res.errCode === 1) {
            toast.error(res.errMsg);
        }
    }

    const handleAddNewUser = () => {
        setIsShowModalUser(true);
        setActionModalUser('CREATE');
    }


    return (
        <>
            <div className="users-container container">
                <h4>List Users</h4>
                <button onClick={() => handleAddNewUser()} className="btn btn-primary my-3">Add user</button>
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <td>No.</td>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Username</th>
                            <th scope="col">Address</th>
                            <th scope="col">Sex</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Group</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 ? (
                            listUsers.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                    <th>{item.id}</th>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.address}</td>
                                    <td>{item.sex}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.Group ? item.Group.name : ''}</td>
                                    <td>
                                        <button onClick={() => handleEditUser(item)} className='btn btn-primary'>Edit</button>
                                        <button onClick={() => handleDeleteUsers(item)} className='btn btn-danger mx-3'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className='text-center' colSpan="8">No data!</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {totalPages > 0 &&
                    <div className="user-footer">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={totalPages}
                            previousLabel="< previous"

                            pageClassName='page-item'
                            pageLinkClassName='page-link'
                            previousClassName='page-item'
                            previousLinkClassName='page-link'
                            nextClassName='page-item'
                            nextLinkClassName='page-link'
                            breakClassName='page-item'
                            breakLinkClassName='page-link'
                            containerClassName='pagination'
                            activeClassName='active'
                        />
                    </div>
                }
            </div>
            <ModalDelete
                show={isShowModal}
                handleClose={handleClose}
                confirmDelete={confirmDelete}
                dataModal={dataModal}
            />

            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    )
}

export default Users