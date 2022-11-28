/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import SearchFilterInput from '../../../component/SearchFilterInput';
import http from '../../../service/PrivateConfigRequest';
import { useEffect } from 'react';
import CustomModalForm from '../../../component/CustomModalForm';
import { customStyles } from '../../../style-component/ReactSelectCustomStyle';
import method from '../../../service/Method';
import CustomModal from '../../../component/CustomModal';
import CustomModalDetail from '../../../component/CustomModalDetail';
import { filterStyles } from '../../../style-component/ReactSelectFilterTable';
import { INVITE_STATUS } from '../../../utils/constant';
import DetailDataUser from '../modal/DetailDataUser';
import DataTable from 'react-data-table-component';
import columnUsers from '../data/column_users_header';
import FormInviteSuperadmin from '../components/FormInviteSuperadmin';
import FormInviteManager from '../components/FormInviteManager';
import ButtonBlueFilter from '../../../component/ButtonBlueFilter';


const UserManagement = () => {
  const isSuperAdmin = useSelector(state => state.auth.isSuperAdmin);
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
    branchId: null,
  }); // state for form invite user

  const [detailEmployee, setDetailEmployee] = useState({
    nip: '',
    email: '',
  }); // detail data selected employee in form selected invite user

  const [userData, setUserData] = useState([]); // state for all user data
  const [isLoading, setIsLoading] = useState(false); // state for checking fetching data in this pages
  const [errorMessage, setErrorMessage] = useState(''); // state if there was an error in fetching data
  const [showModalForm, setShowModalForm] = useState(false); // state for show or hide modal form in invite user
  const [showModalDelete, setShowModalDelete] = useState(false); // state for show or hide modal form in invite user 
  const [showModalResend, setShowModalResend] = useState(false); // state for show or hide modal resend invite user
  const [showModalDetailUser, setShowModalDetailUser] = useState(false); //state for show or hide modal resend detail user
  const [showModalChangeRole, setShowModalChangeRole] = useState(false); // state for show or hide modal change role user
  const [optionsEmployee, setOptionsEmployee] = useState([]); // state for list select options data employee in form invite user
  const [optionsBranch, setOptionsBranch] = useState([]); // state for list select options data branch in form invite form invite user
  const [optionsRole, setOptionsRole] = useState([]); // state for list select options data role in form invite form invite user
  const [optionsFilterBranch, setOptionsFilterBranch] = useState([]); // state for list options data branch in filter data by branch
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

  const [selectedBranch, setSelectedBranch] = useState({
    value: '',
    label: 'Select Branch'
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
    setSelectedBranch({
      value: '',
      label: 'Select Branch'
    })
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
  const requestGetUserManagement = async (keyword, role, status) => {
    return await http.get(`user?keyword=${keyword}&role=${role}&status=${status}`)
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
   * Request get dataset branch
   * @returns {Array}
   */
  const requestGetDatasetBranch = async () => {
    return await http.get('dataset/company-branch');
  }

  /**
   * Callbact for request ger user management
   */
  const fetchUser = useCallback(() => {
    let keywordSearch = keyword;
    let roleFilter = role !== null ? role.value : '';
    let statusFilter = status !== null ? status.value : '';
    return requestGetUserManagement(keywordSearch, roleFilter, statusFilter);

  }, [keyword, role, status]);

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
   * Callback from request get dataset company branch
   */
  const fetchDatasetCompanyBranch = useCallback(() => {
    return requestGetDatasetBranch();
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
        label: `${data.firstname} ${data.lastname} | ${data.nip}`
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
      let userData = res.data.data;
      setIsLoading(false);
      setUserData(userData);
      fetchDatasetEmployee().then((res) => {
        let data = res.data.data;
        setOptionsEmployee(data);
      });
      fetchDatasetRoleManager().then((res) => {
        let data = res.data.data;
        setOptionsRole(data);
        setOptionsFilterRole(data);
      });
      fetchDatasetCompanyBranch().then((res) => {
        let data = res.data.data;
        setOptionsBranch(data);
        setOptionsFilterBranch(data);
      });

    }).catch((err) => {
      if (err.response.status === 403) {
        swal(err.response.data.message, {
          icon: 'error'
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
      setOptionsEmployee([]);
      setOptionsRole([]);
      setOptionsBranch([]);
      setOptionsFilterBranch([]);
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
        {
          isSuperAdmin ?
            <FormInviteSuperadmin
              customStyles={customStyles}
              optionsEmployee={optionsEmployee}
              onChangeSelectEmployee={e => fetchDetailEmployee(e.value)}
              selectedEmployee={selectedEmployee}
              optionsBranch={optionsBranch}
              onChangeSelectBranch={e => {
                setSelectedBranch(e);
                setFormInviteUser({
                  ...formInviteUser,
                  branchId: e.value
                })
              }}
              selectedBranch={selectedBranch}
              optionsRole={optionsRole}
              selectedRole={selectedRole}
              onChangeSelectedRole={e => {
                setSelectedRole(e);
                setFormInviteUser({
                  ...formInviteUser,
                  role: e.value
                })
              }}
              isFetchingEmployee={isFetchingEmployee}
              detailEmployee={detailEmployee}
            /> :
            <FormInviteManager
              customStyles={customStyles}
              optionsEmployee={optionsEmployee}
              onChangeSelectEmployee={e => fetchDetailEmployee(e.value)}
              selectedEmployee={selectedEmployee}
              optionsRole={optionsRole}
              selectedRole={selectedRole}
              onChangeSelectedRole={e => {
                setSelectedRole(e);
                setFormInviteUser({
                  ...formInviteUser,
                  role: e.value
                })
              }}
              isFetchingEmployee={isFetchingEmployee}
              detailEmployee={detailEmployee}
            />
        }
      </Fragment>
    );
  };

  /**
   * OnCancel Handler
   * @param {number} userId 
   */
  const onCancel = (userId) => {
    handleShowModalDelete();
    setUserId(userId);
  };

  /**
   * OnResend Handler
   * @param {number} userId 
   */
  const onResend = (userId) => {
    handleShowModalResend();
    setUserId(userId);
  };

  /**
   * On Remove user handler
   * @param {number} userId 
   */
  const onRemove = (userId) => {
    handleShowModalDelete();
    setUserId(userId);
  }

  /**
   * On Change Role Handler
   * @param {number} userId
   * @param {number} roleId 
   * @param {string} roleLabel 
   */
  const onChangeRole = (userId, roleId, roleLabel) => {
    handleShowModalChangeRole();
    setUserId(userId);
    setSelectedChangeRole({
      value: roleId,
      label: roleLabel
    });
  }

  /**
   * On View Detail User Handler
   * @param {string} userName 
   * @param {string} avatar 
   * @param {string} email 
   * @param {string} role 
   */
  const onView = (userName, avatar, email, role) => {
    handleShowModalDetail(true);
    setViewDetailData({
      name: userName,
      avatar: avatar,
      email: email,
      role: role
    });
  }

  return (
    <div className="tab-pane active" role="tabpanel" id="noanim-tab-example-tabpane-user">

      {/* Modal Detail User */}
      <CustomModalDetail
        size="xl"
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
                        className="high-index"
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
                        className="high-index"
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
                  <ButtonBlueFilter name="Invite" onClick={() => setShowModalForm(true)} />
                </div>
              </div>
            </div>

            <div className="row mt-5 v-50">
              <div className="table-responsive">
                {
                  errorMessage !== '' ? errorMessage :
                    <DataTable
                      columns={
                        columnUsers(
                          onCancel,
                          onResend,
                          onRemove,
                          onChangeRole,
                          onView
                        )
                      }
                      data={userData}
                      progressPending={isLoading}
                      pagination
                      fixedHeader
                      fixedHeaderScrollHeight={'100vh'}
                    />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
