/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import SearchFilterInput from '../../../component/SearchFilterInput';
import http from '../../../service/PrivateConfigRequest';
import { useEffect } from 'react';
import DropdownUserPending from '../components/DropwdownUserPending';
import DropdownUserAccepted from '../components/DropwdownUserAccepted';
import UsePagination from '../../../component/UsePagination';
import CustomModalForm from '../../../component/CustomModalForm';
import { customStyles } from '../../../style-component/ReactSelectCustomStyle';
import method from '../../../service/Method';
import swal from 'sweetalert';
import CustomModal from '../../../component/CustomModal';
import CustomModalDetail from '../../../component/CustomModalDetail';
import { filterStyles } from '../../../style-component/ReactSelectFilterTable';
import { INVITE_STATUS } from '../../../utils/constant';
import { isActionAllowed, isString } from '../../../utils/helper';
import DetailDataUser from '../modal/DetailDataUser';


const UserManagement = ({ tabActive }) => {
  const permissionData = useSelector(state => state.auth.permissions.filter(e => e.name === 'Management')[0]); // get permission for management, to check if current user if can access a few menu in this views
  const history = useHistory();
  const [keyword, setKeyword] = useState(''); // state for search data by keyword

  const [role, setRole] = useState({
    value: '',
    label: 'Select Role...'
  }); // state for selected options filter data by role

  const [status, setStatus] = useState({
    value: '',
    label: 'Select Status...'
  }); // state for selected options filter data by status

  const [userId, setUserId] = useState(''); // state for user id selected in any void

  const [formInviteUser, setFormInviteUser] = useState({
    user_id: '',
    role: '',
  }); // state for form invite user

  const [detailEmployee, setDetailEmployee] = useState({
    nip: '',
    email: '',
  }); // detail data selected employee in form selected invite user

  const [currentPage, setCurrentPage] = useState(1); // state for pagination current page
  const [lastPage, setLastPage] = useState(0); // state for pagination last page
  const [userData, setUserData] = useState([]); // state for all user data
  const [isLoading, setIsLoading] = useState(false); // state for checking fetching data in this pages
  const [errorMessage, setErrorMessage] = useState(''); // state if there was an error in fetching data
  const [showModalForm, setShowModalForm] = useState(false); // state for show or hide modal form in invite user
  const [showModalDelete, setShowModalDelete] = useState(false); // state for show or hide modal form in invite user 
  const [showModalResend, setShowModalResend] = useState(false); // state for show or hide modal resend invite user
  const [showModalDetailUser, setShowModalDetailUser] = useState(false); //state for show or hide modal resend detail user
  const [showModalChangeRole, setShowModalChangeRole] = useState(false); // state for show or hide modal change role user
  const [optionsEmployee, setOptionsEmployee] = useState([]); // state for list select options data employee in form invite user
  const [optionsRole, setOptionsRole] = useState([]); // state for list select options data role in form invite form invite user
  const [optionsFilterRole, setOptionsFilterRole] = useState([]); // state for list options data role in filter data by role
  const [isFetchingEmployee, setIsFetchingEmployee] = useState(false); // state for checking fetching data employee in form invite user

  const [selectedChangeRole, setSelectedChangeRole] = useState({
    value: '',
    label: 'Select Role',
  }); // state for selected value for select options in change role form

  const [selectedEmployee, setSelectedEmployee] = useState({
    value: '',
    label: 'Select Employee'
  }); // state for selected value for select options in selected employee in invite form user

  const [selectedRole, setSelectedRole] = useState({
    value: '',
    label: 'Select Role'
  }); // state for selected value for select options in selected role in invite form user

  const [viewDetailData, setViewDetailData] = useState({
    'avatar': '',
    'name': '',
    'email': '',
    'role': '',
  }); // state for view detail data

  const [isFilterActive, setFilterActive] = useState(false); // state for appearing filter data

  const [postRequestLoading, setPostRequestLoading] = useState(false); // state for checking any request to create or update data
  
  /**
   * Next Page in Pagination
   * @param {event} e 
   */
  const goToNextPage = (e) => {
    e.preventDefault();
    setCurrentPage(page => page + 1);
  };

  /**
   * Prev Page in Pagination
   * @param {event} e 
   */
  const goToPreviousPage = (e) => {
    e.preventDefault();
    setCurrentPage(page => page - 1);
  };

  /**
   * Go to Page in Pagination
   * @param {event} e 
   */
  const changePage = (event) => {
    event.preventDefault();
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  /**
   * Search keyword data user event
   * @param {event} e 
   */
  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  }

  /**
   * Handle on close modal
   */
  const handleCloseModalInvite = () => {
    setShowModalForm(false);
    setDetailEmployee({
      nip: '',
      email: '',
    });
    setSelectedEmployee({
      value: '',
      label: 'Select Employee'
    });
    setFormInviteUser({
      user_id: '',
      role: '',
    });
    setSelectedRole({
      value: '',
      label: 'Select Role'
    });
  }

  /**
   * Handle show modal delete confirmation
   */
  const handleShowModalDelete = () => {
    setShowModalDelete(true);
  }

  /**
   * Handle close modal delete confirmation
   */
  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
    setUserId('');
  }

  /** 
   * Handle show modal resend confirmation
  */
  const handleShowModalResend = () => {
    setShowModalResend(true);
  }

  /**
   * Handle close modal resend confirmation
   */
  const handleCloseModalResend = () => {
    setShowModalResend(false);
    setUserId('');
  }

  /**
   * Handle show modal change role
   */
  const handleShowModalChangeRole = () => {
    setShowModalChangeRole(true);
  }

  /**
   * Handle close modal change role
   */
  const handleCloseModalChangeRole = () => {
    setShowModalChangeRole(false);
    setUserId('');
  }

  /**
   * Handle show modal detail user
   */
  const handleShowModalDetail = () => {
    setShowModalDetailUser(true);
  }

  /**
   * Handle close modal detail user
   */
  const handleCloseModalDetail = () => {
    setShowModalDetailUser(false);
    setDetailEmployee({
      'avatar': '',
      'name': '',
      'email': '',
      'role': '',
    });
  }

  /**
   * Request get list user management
   * @param {string} keyword 
   * @param {string} role 
   * @param {any} status 
   * @param {number} page 
   * @returns {array} 
   */
  const requestGetUserManagement = async (keyword, role, status, page) => {
    return await http.get(`user?keyword=${keyword}&role=${role}&status=${status}&page=${page}`)
  }

  /**
  * Request get dataset employee
  * @returns {Array}
  */
  const requestGetDatasetEmployee = async () => {
    return await http.get(`dataset/employee`);
  }

  /**
   * Request get dataset role manager
   * @returns {Array}
   */
  const requestGetDatasetRoleManager = async () => {
    return await http.get(`dataset/role-manager`);
  }

  /**
   * Request get data employee from id
   * @param {number} employeeId 
   * @returns {Object}
   */
  const requestGetDetailEmployee = async (employeeId) => {
    return await http.get(`dataset/employee/${employeeId}`);
  }

  /**
   * Callbact for request ger user management
   */
  const fetchUser = useCallback(() => {
    let keywordSearch = keyword;
    let roleFilter = role !== null ? role.value : '';
    let statusFilter = status !== null ? status.value : '';
    let current_page = currentPage;
    return requestGetUserManagement(keywordSearch, roleFilter, statusFilter, current_page);

  }, [keyword, role, status, currentPage]);

  /**
   * Callback from request get dataset employee
   */
  const fetchDatasetEmployee = useCallback(() => {
    return requestGetDatasetEmployee();
  });

  /**
   * Callback from request get dataset employee
   */
  const fetchDatasetRoleManager = useCallback(() => {
    return requestGetDatasetRoleManager();
  });

  /**
   * Callback for request get detail employee
   * @param {number} idEmployee
   */
  const fetchDetailEmployee = useCallback((idEmployee) => {
    setUserId(idEmployee);
    setIsFetchingEmployee(true);
    requestGetDetailEmployee(idEmployee).then((res) => {
      let data = res.data.data;
      setIsFetchingEmployee(false);
      setDetailEmployee({
        nip: data.nip,
        email: data.email,
      });
      setFormInviteUser({
        ...formInviteUser,
        user_id: data.id,
      });
      setSelectedEmployee({
        value: data.id,
        label: `${data.name} | ${data.nip}`
      })
    }).catch((err) => {
      alert('Error When Fetching Data Employee. Please Try Again');
    });
  }, [])

  /**
   * handle fetch all data in this pages
   */
  const handleFetchAllData = () => {
    setIsLoading(true);
    fetchUser().then((res) => {
      let userData = res.data.data.data;
      let lastPage = res.data.data.pagination.last_page;
      setIsLoading(false);
      setUserData(userData);
      setLastPage(parseInt(lastPage));
      fetchDatasetEmployee().then((res) => {
        let data = res.data.data;
        setOptionsEmployee(data);
      });
      fetchDatasetRoleManager().then((res) => {
        let data = res.data.data;
        setOptionsRole(data);
        setOptionsFilterRole(data);
      });

    }).catch((err) => {
      if (err.response.status === 403) {
        swal(err.response.data.message, {
          icon : 'error'
        }).then(() => {
          history.push('/forbidden');
        });
      } 
      setIsLoading(false);
      setErrorMessage('There Was An Error. Please Reload The Page');
    });
  }

  /**
   * Component did mount with use effect
   */
  useEffect(() => {
    handleFetchAllData();
    return () => {
      setIsLoading(false);
      setUserData([]);
      setLastPage('');
      setOptionsEmployee([]);
      setOptionsRole([]);
      setErrorMessage('');
    };
  }, [fetchUser])

  /**
   * Handle Change Role Request
   * @param {event} e 
   */
  const handleChangeRole = (e) => {
    e.preventDefault();
    setPostRequestLoading(true);
    let formData = {
      role: selectedChangeRole.value
    };

    method.updateDataByIdWithPut('user', userId, formData)
      .then((res) => {
        setPostRequestLoading(false);
        swal(res.data.message, {
          icon: 'success',
        }).then(() => {
          handleCloseModalChangeRole();
          handleFetchAllData();
        });
      }).catch((err) => {
        setPostRequestLoading(false);
        swal(err.response.data.message, {
          icon: 'error'
        });
      });
  }


  /**
   * Remove or Cancel Invite
   * @param {event} e 
  */
  const removeOrCancelInviteUser = (e) => {
    e.preventDefault();
    setPostRequestLoading(true);
    method.deleteById('user', userId)
      .then((res) => {
        setPostRequestLoading(false);
        swal(res.data.message, {
          icon: 'success',
        }).then(() => {
          handleCloseModalDelete();
          handleFetchAllData();
        });
      }).catch((err) => {
        setPostRequestLoading(false);
        swal(err.response.data.message, {
          icon: 'error',
        });
      });
  }

  /**
   * Submit invite user manager
   * @param {event} e 
   */
  const handleFormInviteSubmit = (e) => {
    e.preventDefault();
    setPostRequestLoading(true);
    let formData = new FormData();
    formData.append('user_id', formInviteUser.user_id);
    formData.append('role', formInviteUser.role);
    method.createDataWithoutUpload('user', formData)
      .then((res) => {
        setPostRequestLoading(false);
        swal(res.data.message, {
          icon: 'success',
        }).then(() => {
          handleCloseModalInvite();
          handleFetchAllData();
        });
      }).catch((err) => {
        setPostRequestLoading(false);
        swal(err.response.data.message, {
          icon: 'error',
        });
      })
  }

  /**
   * Hande reinvite user manager
   * @param {event} e 
   */
  const handleResendInvite = async (e) => {
    e.preventDefault();
    setPostRequestLoading(true);
    await http.post(`user/resend/${userId}`)
      .then((res) => {
        swal(res.data.message, {
          icon: 'success'
        }).then(() => {
          setPostRequestLoading(false);
          handleCloseModalResend();
        });

      }).catch((err) => {
        setPostRequestLoading(false);
        swal(err.response.data.message, {
          icon: 'error',
        })
      })
  }

  /**
   * Children for modal form change role
   * @returns {Component}
   */
  const FormChangeRole = () => {
    return (
      <Fragment>
        <div className="form-group">
          <label htmlFor="role_edit">Role</label>
          <Select
            id="role_edit"
            options={optionsRole}
            styles={customStyles}
            value={selectedChangeRole}
            onChange={e => {
              setSelectedChangeRole(e);
            }}
          />
        </div>
      </Fragment>
    );
  }
  /**
   * Children for modal form
   * @returns {Component}
   */
  const FormInvite = () => {
    return (
      <Fragment>
        <div className="form-group">
          <label htmlFor="name" className="text-blue-dark my-2">Name</label>
          <Select
            id="name"
            options={optionsEmployee}
            styles={customStyles}
            onChange={e => fetchDetailEmployee(e.value)}
            value={selectedEmployee}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role" className="text-blue-dark my-2">Role</label>
          <Select
            id="role"
            options={optionsRole}
            styles={customStyles}
            value={selectedRole}
            defaultValue={'test'}
            onChange={e => {
              setSelectedRole(e);
              setFormInviteUser({
                ...formInviteUser,
                role: e.value
              })
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nip" className="text-blue-dark my-2">NIP</label>
          <input
            type="text"
            name="nip"
            id="nip"
            readOnly
            className="form-control input-text-custom"
            value={isFetchingEmployee ? 'Getting Data...' : detailEmployee.nip}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-blue-dark my-2">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            readOnly
            className="form-control input-text-custom"
            value={isFetchingEmployee ? 'Getting Data...' : detailEmployee.email}
          />
        </div>
      </Fragment>
    );
  };

  

  return (
    <div className={`tab-pane ${tabActive ? 'active' : ''}`} role="tabpanel" id="noanim-tab-example-tabpane-user">

      {/* Modal Detail User */}
      <CustomModalDetail
        size="sm"
        children={
          <DetailDataUser
            srcAvatar={viewDetailData.avatar}
            name={viewDetailData.name}
            email={viewDetailData.email}
            role={viewDetailData.role}
          />
        }
        headerTitle={'Detail User'}
        show={showModalDetailUser}
        handleClose={handleCloseModalDetail}
      />
      {/* Modal Invite User */}
      <CustomModalForm
        headerTitle="Invite"
        show={showModalForm}
        children={<FormInvite />}
        handleClose={() => handleCloseModalInvite()}
        handleSure={(e) => handleFormInviteSubmit(e)}
        submitText={postRequestLoading ? 'Sending...' : 'Send'}
        isSendButtonDisabled={postRequestLoading}
      />

      {/* Modal Delete */}
      <CustomModal
        show={showModalDelete}
        handleClose={handleCloseModalDelete}
        text='Are you sure you want to remove or cancel invite this User?'
        handleSure={(e) => removeOrCancelInviteUser(e)}
        submitText={postRequestLoading ? 'Deleting...' : 'Sure'}
        isSubmitButtonDisabled={postRequestLoading}
      />

      {/* Modal Resend */}
      <CustomModal
        show={showModalResend}
        handleClose={handleCloseModalResend}
        text='Are you sure you want to resend invite this User?'
        handleSure={(e) => handleResendInvite(e)}
        submitText={postRequestLoading ? 'Resending...' : 'Resend'}
        isSubmitButtonDisabled={postRequestLoading}
      />

      {/* Modal Change Role */}
      <CustomModalForm
        show={showModalChangeRole}
        headerTitle='Change Role'
        children={<FormChangeRole />}
        handleClose={() => handleCloseModalChangeRole()}
        handleSure={(e) => handleChangeRole(e)}
        submitText={postRequestLoading ? 'Sending...' : 'Save'}
        isSendButtonDisabled={postRequestLoading}
      />
      <div className="col-xl-12 col-lg-8 col-md-11 col-sm-11 mt-2" style={{ width: '97%' }}>
        <div className="card card-shadow">
          <div className="card-body">
            <div className="row justify-content-left">
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <SearchFilterInput
                  onChangeInput={(e) => onChangeKeyword(e)}
                  input={keyword}
                  canFilter
                  clickFilter={() => {
                    if (isFilterActive) {
                      setFilterActive(false);
                    } else {
                      setFilterActive(true);
                    }
                  }}
                />
              </div>
              {/* Filter */}
              {
                isFilterActive
                  ?
                  <Fragment>
                    <div className="col-xl-2">
                      {/* FILTER ROLE */}
                      <Select
                        id="name"
                        options={optionsFilterRole}
                        styles={filterStyles}
                        isClearable={role !== null && role.value !== '' ? true : false}
                        onChange={e => {
                          setRole(e);
                        }}
                        placeholder={'Select Role...'}
                        value={role}
                      />
                    </div>
                    <div className="col-xl-2">
                      {/* FILTER STATUS */}
                      <Select
                        id="name"
                        options={INVITE_STATUS}
                        isClearable={status !== null && status.value !== '' ? true : false}
                        styles={filterStyles}
                        onChange={e => setStatus(e)}
                        placeholder={'Select Status...'}
                        value={status}
                      />
                    </div>
                  </Fragment>
                  : null
              }

              {/* END */}
              <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12">
                <div className="row row-absolute">
                  <button className="btn-blues mx-auto my-2 font-12" onClick={() => setShowModalForm(true)}>Invite</button>
                </div>
              </div>
            </div>

            <div className="row mt-5 v-50">
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th className="text-left" style={{ paddingLeft: '29px' }}>Name</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Role</th>
                    <th className="text-left">Status</th>
                    <th className="text-right mx-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    isLoading ?
                      <tr>
                        <td colSpan={5}>Fetching Data....</td>
                      </tr>
                      : errorMessage === '' ?
                        userData.length < 1 ?
                          <tr>
                            <td colSpan={5} rowSpan={5}>No Data....</td>
                          </tr>
                          :
                          userData.map((value, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-left" style={{ paddingLeft: '29px' }}>
                                  <img
                                    className="img-circle"
                                    src={value.avatar}
                                    alt=""
                                    width={30}
                                    style={{ marginRight: '3px', paddingBottom: '1px' }}
                                  />
                                  <span className="text-muted">{value.name}</span>
                                </td>
                                <td className="text-left">
                                  <span className="text-muted">{value.email}</span>
                                </td>
                                <td className="text-left">
                                  <span className="text-muted">{value.role}</span>
                                </td>
                                <td className="text-left">
                                  <span className={value.invited_status === '0' ? 'my-badge-pending' : 'my-badge-success'}>
                                    {value.invited_status === '0' ? 'Pending' : 'Accepted'}
                                  </span>
                                </td>
                                <td className="text-right mx-2">
                                  {
                                    value.invited_status === '0' ?
                                      <DropdownUserPending
                                        onCancel={() => {
                                          handleShowModalDelete();
                                          setUserId(value.id);
                                        }}
                                        onResend={() => {
                                          handleShowModalResend();
                                          setUserId(value.id);
                                        }}
                                        canResend={isActionAllowed(permissionData.permissions, 'user-management-permission-resend')}
                                        canCancel={isActionAllowed(permissionData.permissions, 'user-management-permission-delete')}
                                      /> :
                                      <DropdownUserAccepted
                                        onRemove={() => {
                                          handleShowModalDelete();
                                          setUserId(value.id);
                                        }}
                                        onChangeRole={() => {
                                          handleShowModalChangeRole();
                                          setUserId(value.id);
                                          setSelectedChangeRole({
                                            value: value.roles[0].id,
                                            label: value.role
                                          });
                                        }}
                                        onView={() => {
                                          handleShowModalDetail(true);
                                          setViewDetailData({
                                            name: value.name,
                                            avatar: value.avatar,
                                            email: value.email,
                                            role: value.role
                                          });
                                        }}
                                        isUserSuperadmin={value.role === 'Superadmin' || value.role === 'superadmin' ? true : false}
                                        canView={isActionAllowed(permissionData.permissions, 'user-management-permission-detail')}
                                        canChange={isActionAllowed(permissionData.permissions, 'user-management-permission-update')}
                                      />
                                  }
                                </td>
                              </tr>
                            )
                          }) :
                        <tr>
                          <td colSpan={5}>{errorMessage}</td>
                        </tr>
                  }
                </tbody>
              </Table>
            </div>

            {/* PAGINATION */}
            <div className="row justify-content-end">
              <UsePagination
                goToNextPage={(e) => goToNextPage(e)}
                changePage={(e) => changePage(e)}
                goToPreviousPage={(e) => goToPreviousPage(e)}
                currentPage={currentPage}
                pageLimit={isString(lastPage) ? 1 : lastPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserManagement.propTypes = {
  tabActive : PropTypes.bool.isRequired,
};

export default withRouter(UserManagement);
