/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  Route,
  Switch,
  useRouteMatch,
  withRouter,
  useHistory,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import PermissionRole from '../accordions/PermissionRole';
import { capitalizeFirstLetter, isActionAllowed } from '../../../utils/helper';
import http from '../../../service/PrivateConfigRequest';
import { getRole } from '../../../app/redux/rolePermissionReducer';
import swal from 'sweetalert';


const RolePermission = (props) => {
  const permissionData = useSelector(state => state.auth.permissions.filter(e => e.name === 'Management')[0]);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currendIndexTab, setCurrentIndexTab] = useState();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.role.dataRole);
  const history = useHistory();

  const requestGetRole = async (keyword) => {
    return await http.get(`role?keyword=${keyword}`);
  }

  const { path, url } = useRouteMatch();


  const fetchRole = useCallback(() => {
    let searchRoleName = keyword;
    return requestGetRole(searchRoleName);
  },
    [keyword],
  );

  const filterKeywordRole = (e) => {
    setKeyword(e.target.value);
  }

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    fetchRole().then((res) => {
      let roleData = res.data.data;
      dispatch(getRole(roleData));
      if (isMounted) {
        setIsLoading(false);
      }
    }).catch(err => {
      setIsLoading(false);
      if (err.response.status === 403) {
        swal(err.response.data.message, {
          icon: 'error',
        }).then(() => {
          history.push('/forbidden');
        });
      } else {
        swal(err.response.data.message, {
          icon: 'error',
        });
      }
    });
    return () => isMounted = false;
  },
    [fetchRole, dispatch, history]
  );

  const onIndexTabChange = (index) => {
    setCurrentIndexTab(index);
  }

  const onClickDetailRole = (idRole) => {
    history.push(`${path}/${idRole}`)
  }

  return (
    <div className={`tab-pane ${props.tabActive ? 'active' : ''}`} role="tabpanel" id="noanim-tab-example-tabpane-role">
      <div className="row">
        <div className="col-xl-2 col-lg-4 col-md-11 col-sm-11 mt-2">
          <div className="card card-shadow">
            <div className="card-body">
              <p className="text-shadow-black text-center">Role Name</p>
              <div className="form-group mb-3">
                <input
                  id="inputPassword"
                  type="search"
                  className="form-control px-4 input-search"
                  value={keyword}
                  onChange={filterKeywordRole}
                />
                <span className="p-viewer-icon">
                  <img src={`${process.env.PUBLIC_URL}/assets/img/search.png`} alt="eys" />
                </span>
              </div>
              <div className="col-12">
                <div className="card card-border-blue">
                  <div className="card-body">
                    <div className="row justify-content-between">
                      <div className="well span">
                        <div className="flex-column nav nav-pills">
                          {
                            isLoading ? <h5>Fetching Data...</h5>
                              : selector.length < 1
                                ? <h4>No Data...</h4> : selector.map((data, index) => {
                                  return (
                                    <div className="nav-item" key={index} onClick={() => {
                                      onIndexTabChange(index, data['id']);
                                    }}>
                                      <a
                                        onClick={() => {
                                          if (isActionAllowed(permissionData.permissions, 'role-permission-detail')) {
                                            onClickDetailRole(data['id']);
                                          } else {
                                            swal("Sorry. You Don't Have Permission To Access This Resource", {
                                              icon : 'error'
                                            });
                                          }
                                        }}
                                        tabIndex="0"
                                        className={`nav-link ${currendIndexTab === index ? 'active' : ''}`}
                                      >
                                        <div className="d-flex justify-content-end">
                                          <div className="col-12">
                                            <span className="m-xl-4">{capitalizeFirstLetter(data['name'])}</span>
                                          </div>
                                          <div className="col">
                                            <FontAwesomeIcon icon={faAngleRight} />
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  )
                                })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                isActionAllowed(permissionData.permissions, 'role-permission-create') ?
                  <div className="col-12 text-center my-3">
                    <button className="btn-blues" style={{ width: '100%' }} onClick={() => history.push(`/management/add/role`)}>
                      <div className="row justify-content-center">

                        <div className="col-1">
                          <FontAwesomeIcon icon={faPlus} className="px-2" />
                        </div>

                        <div className="col-xl-8 col-lg-7 col-md-6 col-sm-6">
                          Create Role
                        </div>
                      </div>
                    </button>
                  </div> :
                  null
              }
            </div>
          </div>
        </div>
        <Switch>
          <Fragment>
            <div className="col-xl-10 col-lg-8 col-md-11 col-sm-11 mt-2">
              <div className="card card-shadow">
                <div className="card-body">
                  <Route exact path={`${url}/:roleId`} component={withRouter(PermissionRole)}></Route>
                </div>
              </div>
            </div>
          </Fragment>
        </Switch>


      </div>
    </div>
  );
};

export default withRouter(RolePermission);
