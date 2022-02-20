/* eslint-disable react-hooks/exhaustive-deps */
import React, { 
  useCallback, useEffect, useState 
} from 'react';
import { Accordion } from 'react-bootstrap';
import { Fragment } from 'react';
import { arrayUnique, capitalizeFirstLetter, isActionAllowed } from '../../../utils/helper';
import CustomModal from '../../../component/CustomModal';
import { useParams } from 'react-router-dom';
import method from '../../../service/Method';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { permissionUpdate } from '../../../app/redux/reducer';
import { useHistory } from 'react-router-dom';
import { deleteRole } from '../../../app/redux/rolePermissionReducer';

const PermissionRole = () => {
  const permissionData = useSelector(state => state.auth.permissions.filter(e => e.name === 'Management')[0]);
  const [isLoading, setIsLoading] = useState(false); // state for loading when fetching data
  const [errorMessage, setErrorMessage] = useState(''); // state for error message if fetching data was error
  const [role, setRole] = useState(''); // role name
  const [permissionRole, setPermissionRole] = useState([]); // all permission in current role
  const [isCantEdit, setIsCantEdit] = useState(true); // for editing role permissions
  const [roleEdit, setRoleEdit] = useState(''); // for editing role name
  const [permissionRoleEdit, setPermissionRoleEdit] = useState([]); // state for checked permissions
  const [isUserCurrentRole, setIsUserCurrentRole] = useState(false);// state for check if current role is user current role
  const [loadingUpdate, setLoadingUpdate] = useState(false); // state for check if request
  const dispatch = useDispatch(); // dispatch redux
  const history = useHistory();
  /**
   * Modal Event for Logout
   */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // params role id
  let { roleId } = useParams();


  /**
   * Request Fetching role permission data
   * @returns 
   */
  const requestGetRolePermission = async () => {
    return await method.getId('role', roleId);
  }

  /**
   * Callback for request fetching role permission data
   */
  const fetchRolePermission = useCallback(() => {
    return requestGetRolePermission();
  });

  /**
   * Handle permission checkbox
   * @param {*} data 
   * @param {*} scopeId 
   */
  const permissionsChangeCheckbox = (data, scopeId) => {
    const dataPerm = [...permissionRoleEdit];
    let permissionScopeData = [...permissionRole];
    const isChecked = dataPerm.some(checked => checked === data);
    let scopeIndex = permissionScopeData.findIndex(el => el.id === scopeId);
    const isCheckedScopeRole = permissionScopeData[scopeIndex].selected;

    if (isChecked) {
      setPermissionRoleEdit(
        dataPerm.filter((checkedBox) => checkedBox !== data)
      );
      if (isCheckedScopeRole) {
        permissionScopeData[scopeIndex] = { ...permissionScopeData[scopeIndex], selected: false };
        setPermissionRole([...permissionScopeData]);
      }
    } else {
      setPermissionRoleEdit(dataPerm.concat(data));
    }
  };

  /**
   * Handle scope changebox
   * @param {*} id 
   */
  const scopeChangeCheckbox = (id) => {
    let permissionScopeData = [...permissionRole];
    let dataPerm = [...permissionRoleEdit];
    let scopeIndex = permissionScopeData.findIndex(el => el.id === id);
    let permissionData = permissionRole[scopeIndex]['permissions'];
    let isChecked = permissionScopeData[scopeIndex].selected;

    if (isChecked) { // if current scope was checked
      permissionScopeData[scopeIndex] = { ...permissionScopeData[scopeIndex], selected: false };
      let permDataTmp = [];
      permissionData.map(e => permDataTmp.push(e['id']));
      dataPerm = permDataTmp;
      setPermissionRoleEdit(permissionRoleEdit.filter(item => !permDataTmp.includes(item)));
    } else {
      permissionScopeData[scopeIndex] = { ...permissionScopeData[scopeIndex], selected: true };
      let permDataTmp = [];
      permissionData.map(e => permDataTmp.push(e['id']));
      dataPerm = permDataTmp;
      setPermissionRoleEdit(arrayUnique(permissionRoleEdit.concat(dataPerm)));
    }
    setPermissionRole([...permissionScopeData]);
  }

  /**
   * Handling fetching request role permission data
   */
  const handleFetch = () => {
    setIsLoading(true);
    fetchRolePermission().then((res) => {
      let roleData = res.data.data;
      setRole(roleData['role']);
      setRoleEdit(roleData['role']);
      setPermissionRole(roleData['role_permissions']);
      setPermissionRoleEdit(roleData['permissions']);
      setIsUserCurrentRole(roleData['is_current_role_user'])
      setIsLoading(false);
    }).catch(err => {
      if (err.response.status === 403) {
        swal(err.response.data.message, {
          icon: 'error'
        }).then(() => {
          history.goBack();
        })
      }
      setIsLoading(false);
      setErrorMessage('There Was An Error. Please Reload The Page')
    })
  }

  /**
   * Button Discard and Cancel edit
   */
  const onDiscardChanges = () => {
    setIsCantEdit(true);
    handleFetch();
  }

  /**
   * Component did mount
   * Use Effect
   */
  useEffect(() => {
    handleFetch();
    return () => {
      setRole('');
      setRoleEdit('');
      setPermissionRole([]);
      setPermissionRoleEdit([]);
      setIsLoading(false);
      setErrorMessage('');
      setIsUserCurrentRole(false);
    };
  },
    []
  );

  /**
   * on submit update role permissions
   * @param {*} e 
   */
  const onUpdateRolePermissions = (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    if (roleEdit === '') {
      swal("Error!", "Please Fill Role Name", "error");
    } else {
      let formData = {
        'name': roleEdit
      };
      permissionRoleEdit.forEach((data, index) => {
        formData[`permissions[${index}]`] = data;
      });

      method.updateDataByIdWithPut('role', roleId, formData)
        .then((res) => {
          const data = res.data.data;
          swal(res.data.message, {
            icon: "success",
          }).then(() => {
            setLoadingUpdate(false);
            if (data.is_current_role_user) {
              dispatch(permissionUpdate(data.data));
            }
            handleFetch();
            setIsCantEdit(true);
          });
        }).catch(() => {
          setLoadingUpdate(false);
          swal("There is something wrong. Please Try Again!", {
            icon: "error",
          })
        })
    }
  }

  // Handle delete role
  const onDeleteRole = () => {
    method.deleteById('role', roleId)
      .then(res => {
        swal(res.data.message, {
          icon: "success",
        }).then(() => {
          history.push('/management/role');
          dispatch(deleteRole(roleId));
        });
      }).catch(() => {
        swal("There is something wrong. Please Try Again!", {
          icon: "error",
        })
      })
  }

  return (
    <Fragment>
      <CustomModal
        show={show}
        handleClose={handleClose}
        text='Are you sure you want to delete the Role Name ?'
        handleSure={() => onDeleteRole()}
      />
      <div className="">
        <div className="row justify-content-start">
          <div className='col-xl-10 col-lg-10 col-md-12 col-sm-12'>
            <h5>Role Name : {
              isCantEdit ? <span className="text-blue">{capitalizeFirstLetter(role)}</span>
                : <input type="text" name="role" value={capitalizeFirstLetter(roleEdit)} onChange={e => setRoleEdit(e.target.value)} />
            }

            </h5>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12">
            <div className="row row-absolute mx-auto">
              {
                isActionAllowed(permissionData.permissions, 'role-permission-update') ?
                <button className="btn-blue-no-border my-1 font-12" onClick={() => {
                  if (isCantEdit) {
                    setIsCantEdit(false);
                  } else {
                    onDiscardChanges();
                  }
                }}>{isCantEdit ? 'Edit' : 'Cancel'}</button> : null
              }
              {
                isActionAllowed(permissionData.permissions, 'role-permission-delete') ? 
                !isUserCurrentRole || role !== 'superadmin' ?
                  <button className="btn-red m-1" onClick={handleShow}>Delete</button>
                  : null : null
              }

            </div>
          </div>
        </div>
      </div>
      <hr style={{ marginTop: '1px' }} />
      <div className="row justify-content-center">
        <h5 className="text-center text-black-bolder">Menu</h5>
      </div>
      <Accordion alwaysOpen>
        {
          isLoading ? <h5>Fetching Permissions....</h5>
            : errorMessage !== '' ? alert(errorMessage)
              :
              permissionRole.length < 1 ? <h3>No Data...</h3>
                :
                permissionRole.map((scope, index) => {
                  return (
                    <Accordion.Item eventKey={scope['id']} key={index}>
                      <Accordion.Header>
                        <div className="col-12">
                          {capitalizeFirstLetter(scope['name'])}
                        </div>
                        {
                          scope['permissions'].length < 1 ? null
                            :
                            <div className="form-checkbox" onClick={event => event.stopPropagation()}>
                              <input
                                className="form-check-input"
                                disabled={isCantEdit}
                                checked={scope['selected']}
                                type="checkbox"
                                id={scope['name']}
                                onChange={() => {
                                  scopeChangeCheckbox(scope['id'])
                                }} />
                              <label className="form-check-label" style={{ paddingLeft: '3px' }} htmlFor={scope['name']} >
                                All
                              </label>
                            </div>
                        }


                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="container">
                          <div className="row">
                            {
                              scope['permissions'].length < 1 ? <h3>No Permission Data...</h3>
                                :
                                scope['permissions'].map((permission, key) => {
                                  return (
                                    <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12" key={key}>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          checked={permissionRoleEdit.includes(permission['id']) ? true : false}
                                          type="checkbox"
                                          id={permission['name']}
                                          disabled={isCantEdit}
                                          onChange={(event) => {
                                            event.stopPropagation();
                                            permissionsChangeCheckbox(permission['id'], permission['scope_id']);
                                          }}
                                        />
                                        <label className="form-check-label" htmlFor={permission['name']}>
                                          {permission['display_name']}
                                        </label>
                                      </div>
                                    </div>
                                  )
                                })
                            }
                          </div>
                        </div>

                      </Accordion.Body>
                    </Accordion.Item>
                  )
                })
        }
      </Accordion>
      <hr />
      {
        !isCantEdit ? <div className="row justify-content-end p-4">
          <button className="btn-border-blue my-1 font-11" onClick={onDiscardChanges}>Discard</button>
          <button disabled={loadingUpdate} className="btn-blues-small my-1 mx-2 font-12" onClick={(e) => onUpdateRolePermissions(e)}>
            {loadingUpdate ? 'Sending...' : 'Save'}
          </button>
        </div> : null
      }
    </Fragment>
  );
};


export default PermissionRole;