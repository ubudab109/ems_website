/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import method from '../../../service/Method';
import { arrayUnique, capitalizeFirstLetter, setMessageError } from '../../../utils/helper';

const AddRolePermissions = (props) => {

  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false); // state for loading when fetching data
  const [errorMessage, setErrorMessage] = useState(''); // state for error message if fetching data was error
  const [permission, setPermission] = useState([]); // all permission in current role
  const [permissionRole, setPermissionRole] = useState([]); // state for checked permissions
  const [scopeCheckedData, setScopeCheckedData] = useState([]); // state for checked scope permissions
  const [loadingCreate, setLoadingCreate] = useState(false); //state for set loading when submit create role permission
  const history = useHistory();
  /**
   * Request Fetching role permission data
   * @returns 
   */
  const requestGetPermission = async () => {
    return await method.getAll('role/permissions');
  };

  /**
   * Callback for request fetching  permission data
   */
  const fetchPermission = useCallback(() => {
    return requestGetPermission();
  });


  /**
   * Handle permission checkbox
   * @param {*} data 
   * @param {*} scopeId 
   */
  const permissionsChangeCheckbox = (data, scopeId) => {
    const dataPerm = [...permissionRole];
    let scopeChecked = [...scopeCheckedData];
    const isChecked = dataPerm.some(checked => checked === data);
    const isCheckedScopeRole = scopeCheckedData.includes(scopeId);

    if (isChecked) {
      setPermissionRole(
        dataPerm.filter((checkedBox) => checkedBox !== data)
      );
      if (isCheckedScopeRole) {
        setScopeCheckedData(
          scopeChecked.filter(scope => scope !== scopeId)
        );
      }
    } else {
      setPermissionRole(dataPerm.concat(data));
    }
  };


  /**
   * Handle scope changebox
   * @param {*} id 
   */
  const scopeChangeCheckbox = (id) => {
    let permissionScopeData = [...permission];
    let scopeChecked = [...scopeCheckedData];
    let dataPerm = [...permissionRole];
    let scopeIndex = permissionScopeData.findIndex(el => el.id === id);
    let permissionData = permission[scopeIndex]['permissions'];
    let isChecked = scopeCheckedData.includes(id);

    if (isChecked) { // if current scope was checked
      setScopeCheckedData(
        scopeChecked.filter(scope => scope !== id)
      );
      let permDataTmp = [];
      permissionData.map(e => permDataTmp.push(e['id']));
      dataPerm = permDataTmp;
      setPermissionRole(permissionRole.filter(item => !permDataTmp.includes(item)));
    } else {
      setScopeCheckedData(
        scopeChecked.concat(id)
      );
      let permDataTmp = [];
      permissionData.map(e => permDataTmp.push(e['id']));
      dataPerm = permDataTmp;
      setPermissionRole(arrayUnique(permissionRole.concat(dataPerm)));
    }
    // setPermissionRole([...permissionScopeData]);
  };

  /**
   * Handle fetch permission data
   */
  const handleFetch = () => {
    setIsLoading(true);
    fetchPermission().then((res) => {
      let permissiondata = res.data.data;
      setPermission(permissiondata);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      setErrorMessage('There Was An Error. Please Reload The Page')
    })
  };

  /**
   * Component did mount
   */
  useEffect(() => {
    handleFetch();
    return () => {
      setRole('');
      setIsLoading(false);
      setPermission([]);
      setErrorMessage('');
    };
  },
    []
  );

  /**
   * Handle submit create role permissions
   * @param {event} e 
   */
  const handleSubmitCreateRole = (e) => {
    e.preventDefault();
    setLoadingCreate(true);
    let formData = new FormData();

    formData.append('name', role);
    permissionRole.forEach((data, index) => {
      formData.append(`permissions[${index}]`, data);
    });

    method.createDataWithoutUpload('role', formData)
    .then(res => {
      setLoadingCreate(false);
      swal(res.data.message, {
        icon: "success",
      }).then(() => {
        history.push('/management')
      });
    }).catch((err) => {
      setLoadingCreate(false);
      swal(setMessageError(err.response.status), {
        icon: "error",
      })
    })
  };


  return (
    <div className={`tab-pane active`} role="tabpanel" id="noanim-tab-example-tabpane-role">
      <div className="card card-shadow">
        <h1 className="mt-4 breadcumb">Create Role & Permission</h1>
        <div className="card-body">
          <div className="">
            <div className="row justify-content-left">
              <div className='col-xl-10 col-lg-10 col-md-12 col-sm-12'>
                <h5>Role Name : <input type="text" placeholder="Type Role Name Here..." className="custom-text-input" name="role" value={role} onChange={e => setRole(e.target.value)} />

                </h5>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <h5 className="text-center text-black-bolder">Menu</h5>
          </div>
          <Accordion alwaysOpen>
            {
              isLoading ? <h5>Fetching Permissions....</h5>
                : errorMessage !== '' ? alert(errorMessage)
                  :
                  permission.length < 1 ? <h3>No Data...</h3>
                    :
                    permission.map((scope, index) => {
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
                                    checked={scopeCheckedData.includes(scope['id']) ? true : false}
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
                                              checked={permissionRole.includes(permission['id']) ? true : false}
                                              type="checkbox"
                                              id={permission['name']}
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
          <div className="row justify-content-end p-5">
            <button className="btn-border-blue-small my-1 mx-2 font-12" onClick={() => history.push('/management')}>Cancel</button>

            <button disabled={loadingCreate} className="btn-blues-small my-1 font-12" onClick={(e) => handleSubmitCreateRole(e)}>
              {loadingCreate ? 'Sending...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRolePermissions;
