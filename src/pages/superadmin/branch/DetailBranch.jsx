/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import swal from "sweetalert";
import MapPicker from "react-google-map-picker";
import http from "../../../service/PrivateConfigRequest";
import { defaultNotifError, notifError, notifSuccess, ucwords } from "../../../utils/helper";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";
import { WORKING_SYSTEM } from "../../../utils/constant";
import CustomModalDetail from "../../../component/CustomModalDetail";
import MapGoogle from "../../../component/GoogleMap";
import ManagerForm from "./modal/ManagerForm";
import method from "../../../service/Method";

const placesLibrary = ["places"];

const DetailBranch = () => {
  const history = useHistory();
  const { id } = useParams();
  const [dataBranch, setDataBranch] = useState({});
  const [formDataBranch, setFormDataBranch] = useState({});
  const [headBranch, setHeadBranch] = useState({});
  const [formHeadBranch, setFormHeadBranch] = useState({
    name: "manager_id",
    value: "",
    label: "Select Manager",
  });
  const [dataManager, setDataManager] = useState([]);
  const [modalManager, setModalManager] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [zoom, setZoom] = useState(50);
  const [loadingSubmit, setIsLoadingSubmit] = useState(false);
  const [modalMap, setModalMap] = useState(false);
  const [modalDetailMap, setModalDetailMap] = useState(false);
  const [defaultLocation, setDefaultLocation] = useState({});
  const [loadingFilter, setLoadingFilter] = useState({
    regencies: false,
    districts: false,
    villages: false,
  });
  const [dataFilter, setDataFilter] = useState({
    provinces: [],
    regencies: [],
    districts: [],
    villages: [],
  });
  const [searchResult, setSearchResult] = useState("");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: placesLibrary,
  });

  const requestDetailBranch = async () => {
    return await http.get(`company-branch/${id}`);
  };

  /**
   *
   * @param {string} type - regencies, districts, villages
   * @param {number} idParent - Parent id from, provinceId, regenciesId, distritsId, villagesId
   * @returns {Promise}
   */
  const requestChildData = async (type, idParent) => {
    switch (type) {
      case "regencies":
        return await http.get(`dataset/regencies?province_id=${idParent}`);
      case "districts":
        return await http.get(`dataset/districts?regency_id=${idParent}`);
      case "villages":
        return await http.get(`dataset/villages?district_id=${idParent}`);
      default:
        return null;
    }
  };

  /**
   * FETCH DATASET PROVINCES
   */
  const fetchDataProvince = async () => {
    await http.get("dataset/provinces").then((res) => {
      const data = res.data.data;
      setDataFilter({
        ...dataFilter,
        provinces: data,
      });
    });
  };

  /**
   * FETCH DATA REGENCIES
   * @param {number} provinceId
   */
  const fetchDataRegencies = async (provinceId) => {
    setLoadingFilter({ ...loadingFilter, regencies: true });
    await requestChildData("regencies", provinceId).then((res) => {
      const data = res.data.data;
      setDataFilter({ ...dataFilter, regencies: data });
      setLoadingFilter({ ...loadingFilter, regencies: false });
    });
  };

  /**
   * FETCH DATA DISTRITCTS
   * @param {number} regencyId
   */
  const fetchDataDistricts = async (regencyId) => {
    setLoadingFilter({ ...loadingFilter, districts: true });
    await requestChildData("districts", regencyId).then((res) => {
      const data = res.data.data;
      setDataFilter({ ...dataFilter, districts: data });
      setLoadingFilter({ ...loadingFilter, districts: false });
    });
  };

  /**
   * FETCH DATA VILLAGES
   * @param {number} districtId
   */
  const fetchDataVillages = async (districtId) => {
    setLoadingFilter({ ...loadingFilter, villages: true });
    await requestChildData("villages", districtId).then((res) => {
      const data = res.data.data;
      setDataFilter({ ...dataFilter, villages: data });
      setLoadingFilter({ ...loadingFilter, villages: false });
    });
  };

  /**
   *
   * @param {event} e
   * @param {string} type - TYPE TO GET DATA
   */
  const selectFilterHandler = (e, type) => {
    switch (type) {
      case "regencies":
        setFormDataBranch({
          ...formDataBranch,
          province_id: e,
          regency_id: {
            name: "regency_id",
            label: "Select Regency",
            value: "",
          },
          district_id: {
            name: "district_id",
            label: "Select District",
            value: "",
          },
          villages_id: {
            name: "villages_id",
            label: "Select Villages",
            value: "",
          },
        });
        fetchDataRegencies(e.value);
        break;
      case "districts":
        setFormDataBranch({
          ...formDataBranch,
          regency_id: e,
          district_id: {
            name: "district_id",
            label: "Select District",
            value: "",
          },
          villages_id: {
            name: "villages_id",
            label: "Select Villages",
            value: "",
          },
        });
        fetchDataDistricts(e.value);
        break;
      case "villages":
        setFormDataBranch({
          ...formDataBranch,
          district_id: e,
          villages_id: {
            name: "villages_id",
            label: "Select Villages",
            value: "",
          },
        });
        fetchDataVillages(e.value);
        break;
      default:
        return null;
    }
  };

  /**
   * FETCH DATA BRANCH DETAIL
   */
  const fetchDataBranch = async () => {
    setIsLoading(true);
    await requestDetailBranch()
      .then((res) => {
        const data = res.data.data;
        const branch = data.branch;
        const head = data.head_branch;
        const branchToState = {
          id: branch.id,
          branch_name: branch.branch_name,
          branch_code: branch.branch_code,
          is_centered: branch.is_centered,
          province_id: {
            name: "province_id",
            label: branch.provincies.name,
            value: branch.province_id,
          },
          regency_id: {
            name: "regency_id",
            label: branch.regencies.name,
            value: branch.regency_id,
          },
          district_id: {
            name: "district_id",
            label: branch.district.name,
            value: branch.district_id,
          },
          villages_id: {
            name: "villages_id",
            label: branch.villages.name,
            value: branch.villages_id,
          },
          address: branch.address,
          status: branch.status,
          is_radius_active: branch.is_radius_active,
          latitude: branch.latitude,
          longitude: branch.longitude,
          attendance_radius: branch.attendance_radius,
          work_type: {
            name: "work_type",
            label: ucwords(branch.work_type),
            value: branch.work_type,
          },
        };
        setDefaultLocation({
          lat: parseFloat(branch.latitude),
          lng: parseFloat(branch.longitude),
        });
        setHeadBranch(head);
        setFormDataBranch(branchToState);
        setDataBranch(branch);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        defaultNotifError("Detail Branch");
      });
  };

  /**
   * FETCH DATA MANAGER
   */
  const fetchDataManager = async () => {
    await http
      .get(`dataset/manager?branch_id=${id}&not_head_branch=1`)
      .then((res) => {
        const data = res.data.data;
        let arrData = [];
        data.forEach((row) => {
          let item = {
            name: "manager_id",
            label: row.name + " " + row.email,
            value: row.id,
          };
          arrData.push(item);
        });
        setDataManager(arrData);
      });
  };

  /**
   * ON LOAD REACT GOOGLE MAPS API
   * @param {Any} autoComplete
   */
  const onLoad = (autoComplete) => {
    setSearchResult(autoComplete);
  };

  /**
   * HANDLER CHANGE LOCATION
   * @param {Number} lat
   * @param {Number} lng
   */
  const handleChangeLocation = (lat, lng) => {
    setDefaultLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
  };

  /**
   * HANDLER ZOOM MAP
   * @param {Number} newZoom
   */
  const handleChangeZoom = (newZoom) => {
    setZoom(newZoom);
  };

  /**
   * ON AUTOCOMPLETE CHANGED
   * @returns {Bool}
   */
  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();

      //variable to store the name from place details result
      const name = place.name;
      //variable to store the formatted address from place details result
      const formattedAddress = place.formatted_address;

      if (place.geometry.location.lat() && place.geometry.location.lng()) {
        setDefaultLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
      if (formattedAddress !== undefined) {
        setFormDataBranch({ ...formDataBranch, address: formattedAddress });
      } else {
        setFormDataBranch({ ...formDataBranch, address: name });
      }
    } else {
      return false;
    }
  };

  /**
   * On change handler for text in form
   * @param {Event} e
   */
  const onChangeText = (e) => {
    setFormDataBranch({ ...formDataBranch, [e.target.name]: e.target.value });
  };

  /**
   * UPDATE DATA BRANCH
   * @param {Event} e 
   */
  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    swal({
      title: "Update Data Branch?",
      text: "Please make sure the data is correct",
      buttons: true,
      dangerMode: true,
      icon: "warning",
    }).then(async (isYes) => {
      if (isYes) {
        let form = {
          branch_name: formDataBranch.branch_name,
          branch_code: formDataBranch.branch_code,
          province_id: formDataBranch.province_id.value,
          regency_id: formDataBranch.regency_id.value,
          district_id: formDataBranch.district_id.value,
          villages_id: formDataBranch.villages_id.value,
          address: formDataBranch.address,
          is_radius_active: formDataBranch.is_radius_active ? 1 : 0,
          latitude: formDataBranch.latitude,
          longitude: formDataBranch.longitude,
          work_type: formDataBranch.work_type.value,
        };
        if (formDataBranch.is_radius_active) {
          form["attendance_radius"] = formDataBranch.attendance_radius; 
        }
        await method.updateDataByIdWithPut('company-branch', id, form)
        .then(async (res) => {
          notifSuccess("Success", "Data Branch Updated Successfully");
          await fetchDataBranch();
          setIsEdit(false);
        }).catch((err) => {
          console.log(err.response);
          const status = err.response.status;
          if (status > 400 && status < 500) {
            notifError("Error", "Please check the required input");
          } else {
            defaultNotifError("Update Branch");
          }
        })
      } else {
        return false;
      }
    })
  }

  /**
   * COMPONENT DID MOUNT
   */
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchDataBranch();
      fetchDataProvince();
      fetchDataManager();
    }
    return () => (isMounted = false);
  }, []);

  if (!isLoaded) {
    return <div>....</div>;
  }

  return (
    <Fragment>
      {/* FOR EDIT MAP PICKER */}
      <CustomModalDetail
        show={modalMap}
        handleClose={() => {
          setModalMap(false);
          setZoom(50);
          setFormDataBranch({
            ...formDataBranch,
            latitude: parseFloat(dataBranch.latitude),
            longitude: parseFloat(dataBranch.longitude),
          });
          setDefaultLocation({
            lat: parseFloat(dataBranch.latitude),
            lng: parseFloat(dataBranch.longitude),
          });
        }}
        closeButtonName={"Cancel"}
        isEditable
        children={
          <MapPicker
            defaultLocation={defaultLocation}
            zoom={zoom}
            mapTypeId="roadmap"
            style={{ height: "700px" }}
            onChangeLocation={handleChangeLocation}
            onChangeZoom={handleChangeZoom}
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          />
        }
        handleSave={() => {
          setFormDataBranch({
            ...formDataBranch,
            latitude: defaultLocation.lat,
            longitude: defaultLocation.lng,
          });
          setModalMap(false);
        }}
      />

      {/* FOR DETAIL MAP */}
      <CustomModalDetail
        show={modalDetailMap}
        handleClose={() => {
          setModalDetailMap(false);
        }}
        isEditable={false}
        headerTitle={"Detail Map"}
        children={
          <MapGoogle
            latitude={dataBranch.latitude}
            longitude={dataBranch.longitude}
            address={dataBranch.address}
            zoomMap={20}
          />
        }
      />

      {/* FOR CHANGE HEAD BRANCH OR ADD */}
      <CustomModalDetail
        show={modalManager}
        handleClose={() => {
          setModalManager(false);
          setFormHeadBranch({ value: "", label: "Select Manager" });
        }}
        headerTitle={"Change or Assign Head Branch"}
        closeButtonName={"Cancel"}
        isEditable
        children={
          <ManagerForm
            data={dataManager}
            selected={formHeadBranch}
            onChange={(e) => setFormHeadBranch(e)}
          />
        }
        handleSave={() => console.log(formDataBranch)}
      />
      <h1 className="mt-4 breadcumb my-4">Detail Branch</h1>
      <div className="row">
        <div className="col-12 pl-25">
          <button
            className="btn btn-white-filter"
            onClick={() => history.push("/branch")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/left.png`}
              alt="left"
            />
          </button>
          <div className="divider-card mt-3 mb-3" style={{ width: "99%" }} />
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
              {/* DATA BRANCH */}
              <div>
                <div className="card card-shadow">
                  <div className="card-header">
                    <h5 className="text-bold">Data Branch</h5>
                  </div>
                  <div className="col-md-12 mt-2">
                    <ButtonBlueFilter
                      name={isEdit ? "Cancel" : "Edit"}
                      type={"button"}
                      disabled={loadingSubmit}
                      className={"float-end"}
                      onClick={() => {
                        if (isEdit) {
                          setIsEdit(false);
                        } else {
                          setIsEdit(true);
                        }
                      }}
                    />
                  </div>
                  <div className="card-body">
                    {/* BRANCH NAME AND BRANCH CODE */}
                    <div className="row mt-3">
                      <div className="form-group col-md-6">
                        <label htmlFor="branch_name" className="text-bold">
                          Branch Name
                        </label>
                        <input
                          type="text"
                          name="branch_name"
                          required
                          disabled={!isEdit}
                          className="form-control input-border-grey"
                          value={
                            !isEdit
                              ? dataBranch.branch_name
                              : formDataBranch.branch_name
                          }
                          onChange={(e) => onChangeText(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="branch_name" className="text-bold">
                          Branch Code
                        </label>
                        <input
                          type="text"
                          disabled={!isEdit}
                          name="branch_code"
                          required
                          className="form-control input-border-grey"
                          value={
                            !isEdit
                              ? dataBranch.branch_code
                              : formDataBranch.branch_code
                          }
                          onChange={(e) => onChangeText(e)}
                        />
                      </div>
                    </div>

                    {/* TERITORIAL PROVINCE, REGENCY, DISTRICT, VILLAGES */}
                    <div className="row mt-3">
                      {/* PROVINCE */}
                      <div className="form-group col-xl-3 col-lg-4 col-md-6">
                        <label htmlFor="province_id" className="text-bold">
                          Province
                        </label>
                        {!isEdit ? (
                          <input
                            className="form-control input-border-grey"
                            name="province_id"
                            value={dataBranch.provincies.name}
                            disabled
                            readOnly
                          />
                        ) : (
                          <Select
                            id="province_id"
                            name="province_id"
                            required
                            options={dataFilter.provinces}
                            styles={filterStyles}
                            isClearable={false}
                            onChange={(e) =>
                              selectFilterHandler(e, "regencies")
                            }
                            placeholder={"Select Provinces..."}
                            value={formDataBranch.province_id}
                          />
                        )}
                      </div>

                      {/* REGENCY */}
                      <div className="form-group col-xl-3 col-lg-4 col-md-6">
                        <label htmlFor="regency_id" className="text-bold">
                          Regency
                        </label>
                        {!isEdit ? (
                          <input
                            className="form-control input-border-grey"
                            name="regency_id"
                            value={dataBranch.regencies.name}
                            disabled
                            readOnly
                          />
                        ) : (
                          <Select
                            id="regency_id"
                            required
                            options={
                              formDataBranch.province_id === null ||
                              formDataBranch.province_id.value === ""
                                ? null
                                : dataFilter.regencies
                            }
                            styles={filterStyles}
                            isClearable={false}
                            isDisabled={
                              formDataBranch.province_id === null ||
                              formDataBranch.province_id.value === ""
                            }
                            onChange={(e) =>
                              selectFilterHandler(e, "districts")
                            }
                            placeholder={
                              loadingFilter.regencies
                                ? "Fetching..."
                                : "Select Regencies..."
                            }
                            value={formDataBranch.regency_id}
                          />
                        )}
                      </div>

                      {/* DISTRICTS */}
                      <div className="form-group col-xl-3 col-lg-4 col-md-6">
                        <label htmlFor="district_id" className="text-bold">
                          District
                        </label>
                        {!isEdit ? (
                          <input
                            className="form-control input-border-grey"
                            name="district_id"
                            value={dataBranch.district.name}
                            disabled
                            readOnly
                          />
                        ) : (
                          <Select
                            id="district_id"
                            name="district_id"
                            required
                            options={dataFilter.districts}
                            styles={filterStyles}
                            isClearable={false}
                            isDisabled={
                              formDataBranch.regency_id === null ||
                              formDataBranch.regency_id.value === ""
                            }
                            onChange={(e) => selectFilterHandler(e, "villages")}
                            placeholder={"Select Districts..."}
                            value={formDataBranch.district_id}
                          />
                        )}
                      </div>

                      {/* VILLAGES */}
                      <div className="form-group col-xl-3 col-lg-4 col-md-6">
                        <label htmlFor="villages_id" className="text-bold">
                          Villages
                        </label>
                        {!isEdit ? (
                          <input
                            className="form-control input-border-grey"
                            name="villages_id"
                            value={dataBranch.villages.name}
                            disabled
                            readOnly
                          />
                        ) : (
                          <Select
                            id="villages_id"
                            name="villages_id"
                            required
                            options={dataFilter.villages}
                            styles={filterStyles}
                            isClearable={false}
                            onChange={(e) =>
                              setFormDataBranch({
                                ...formDataBranch,
                                villages_id: e,
                              })
                            }
                            isDisabled={formDataBranch.district_id.value === ""}
                            placeholder={"Select Villages..."}
                            value={formDataBranch.villages_id}
                          />
                        )}
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="row mt-3">
                      <div className="form-group col-md-12">
                        <label htmlFor="" className="text-bold">
                          Address
                        </label>
                        {!isEdit ? (
                          <textarea
                            name="address"
                            id="address"
                            className="form-control input-border-grey"
                            cols="30"
                            rows="10"
                            disabled
                            readOnly
                            value={dataBranch.address}
                          ></textarea>
                        ) : (
                          <Autocomplete
                            onLoad={onLoad}
                            onPlaceChanged={onPlaceChanged}
                            children={
                              <input
                                type="text"
                                required
                                value={formDataBranch.address}
                                name="address"
                                onChange={(e) => onChangeText(e)}
                                id=""
                                className="form-control input-border-grey"
                              />
                            }
                          />
                        )}
                        <div className="form-check">
                          {!isEdit ? (
                            <input
                              checked={dataBranch.is_radius_active}
                              disabled
                              className="form-check-input"
                              name="is_radius_active"
                              type="checkbox"
                              id="is_radius_active"
                            />
                          ) : (
                            <input
                              onChange={() => {
                                if (formDataBranch.is_radius_active) {
                                  setFormDataBranch({
                                    ...formDataBranch,
                                    is_radius_active: false,
                                  });
                                } else {
                                  setFormDataBranch({
                                    ...formDataBranch,
                                    is_radius_active: true,
                                  });
                                }
                              }}
                              value={formDataBranch.is_radius_active}
                              checked={formDataBranch.is_radius_active}
                              className="form-check-input"
                              name="is_radius_active"
                              type="checkbox"
                              id="is_radius_active"
                            />
                          )}
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Is Radius Active{" "}
                            <span
                              style={{ cursor: "pointer", color: "blue" }}
                              onClick={() =>
                                swal({
                                  icon: "warning",
                                  title: "What if radius is active?",
                                  text: "If the radius system is activated, then the current branch of the company will activate the presence radius detection system when an employee scans for clock in.",
                                })
                              }
                            >
                              ?
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* RADIUS (IF RADIUS ACTIVE) */}
                    {formDataBranch.is_radius_active ? (
                      <div className="row mt-3">
                        <div className="form-group col-12">
                          <label
                            htmlFor="attendance_radius"
                            className="text-bold"
                          >
                            Attendance Radius (IN METER)
                          </label>
                          <input
                            type="number"
                            required
                            disabled={!isEdit}
                            value={
                              !isEdit
                                ? dataBranch.attendance_radius
                                : formDataBranch.attendance_radius
                            }
                            name="attendance_radius"
                            id="attendance_radius"
                            className="form-control input-border-grey mb-2"
                            onChange={(e) => onChangeText(e)}
                          />
                        </div>
                      </div>
                    ) : null}

                    {/* LONGITUDE AND LATITUDE */}
                    <div className="row mt-3">
                      <div className="form-group col-12">
                        <label htmlFor="marker" className="text-bold">
                          Select Map
                        </label>
                        <br />
                        {!isEdit ? (
                          <ButtonBlueFilter
                            name="DetailMap"
                            onClick={() => setModalDetailMap(true)}
                          />
                        ) : (
                          <ButtonBlueFilter
                            name="Select Map (REQUIRED)"
                            onClick={() => setModalMap(true)}
                          />
                        )}
                      </div>
                    </div>

                    {/* WORKING SYSTEM */}
                    <div className="row mt-3">
                      <div className="form-group col-12">
                        <label htmlFor="work_type" className="text-bold">
                          Working System
                        </label>
                        {!isEdit ? (
                          <input
                            className="form-control input-border-grey"
                            value={dataBranch.work_type.toUpperCase()}
                            disabled
                            readOnly
                          />
                        ) : (
                          <Select
                            id="work_type"
                            name="work_type"
                            required
                            options={WORKING_SYSTEM}
                            styles={filterStyles}
                            isClearable={false}
                            onChange={(e) =>
                              setFormDataBranch({
                                ...formDataBranch,
                                work_type: e,
                              })
                            }
                            placeholder={"Working System"}
                            value={formDataBranch.work_type}
                          />
                        )}
                      </div>
                    </div>

                    {isEdit ? (
                      <div className="btn-group mt-3">
                        <button
                          type="button"
                          onClick={(e) => onSubmitUpdate(e)}
                          className="btn btn-blue"
                          disabled={loadingSubmit}
                        >
                          {loadingSubmit ? "Creating..." : "Save"}
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
          </div>

          {/* DATA HEAD BRANCH */}
          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="card card-shadow">
              <div className="card-header">
                <h5 className="text-bold">Head Branch</h5>
              </div>
              <div className="col-md-12 mt-2">
                <ButtonBlueFilter
                  name={headBranch === null ? "Assign" : "Change Head Branch"}
                  disabled={loadingSubmit}
                  className={"float-end"}
                  onClick={() => setModalManager(true)}
                />
              </div>
              <div className="card-body">
                {headBranch === null ? (
                  <div>No Head Branch...</div>
                ) : (
                  <Fragment>
                    <div className="row mt-3">
                      <div className="form-group col-md-6">
                        <label htmlFor="" className="text-bold">
                          Fullname
                        </label>
                        <input
                          type="text"
                          disabled
                          value={headBranch.name}
                          name="fullname"
                          id="fullname_manager"
                          className="form-control input-border-grey"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="" className="text-bold">
                          Email
                        </label>
                        <input
                          type="text"
                          disabled
                          value={headBranch.email}
                          name="email"
                          id="email_manager"
                          className="form-control input-border-grey"
                        />
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DetailBranch;
