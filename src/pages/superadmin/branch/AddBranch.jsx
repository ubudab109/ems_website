/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import MapPicker from "react-google-map-picker";
import swal from "sweetalert";
import http from "../../../service/PrivateConfigRequest";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";
import CustomModalDetail from "../../../component/CustomModalDetail";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";
import { WORKING_SYSTEM } from "../../../utils/constant";
import {
  defaultNotifError,
  notifError,
  notifSuccess,
} from "../../../utils/helper";

const placesLibrary = ["places"];

const AddBranch = () => {
  const DefaultLocation = { lat: -6.2, lng: 106.816666 };
  const DefaultZoom = 50;

  const history = useHistory();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: placesLibrary,
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [modalMap, setModalMap] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [form, setForm] = useState({
    branch_name: "",
    branch_code: "",
    province_id: {
      name: "province_id",
      value: "",
      label: "Select Province",
    },
    regency_id: {
      name: "regency_id",
      value: "",
      label: "Select Regency",
    },
    district_id: {
      name: "district_id",
      value: "",
      label: "Select District",
    },
    villages_id: {
      name: "villages_id",
      value: "",
      label: "Select Villages",
    },
    is_radius_active: 0,
    address: "",
    latitude: "",
    longitude: "",
    attendance_radius: 0,
    work_type: {
      name: "work_type",
      value: "",
      label: "Select Working System",
    },
  });
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
    setForm({ ...form, latitude: lat, longitude: lng });
  };

  /**
   * HANDLER ZOOM MAP
   * @param {Number} newZoom
   */
  const handleChangeZoom = (newZoom) => {
    setZoom(newZoom);
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
        setForm({
          ...form,
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
        setForm({
          ...form,
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
        setForm({
          ...form,
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
   * Onchange handler for input text or number
   * @param {Event} e
   */
  const onChangeText = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
        setForm({ ...form, address: formattedAddress });
      } else {
        setForm({ ...form, address: name });
      }
    } else {
      return false;
    }
  };

  /**
   * HANDLER ON SUBMIT CREATE BRANCH
   * @param {Event} e
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.is_radius_active) {
      if (form.latitude === "" || form.latitude === 0) {
        return notifError(
          "Validation Failed",
          "Please select the map if radius is active"
        );
      }

      if (form.longitude === "" || form.longitude === 0) {
        return notifError(
          "Validation Failed",
          "Please select the map if radius is active"
        );
      }
    }

    swal({
      dangerMode: true,
      title: "Create New Branch",
      text: "Are You sure want to create new branch?. Please make sure the data is already correct.",
      icon: "warning",
      buttons: true,
    }).then(async (isYes) => {
      if (isYes) {
        setLoadingSubmit(true);
        let formData = new FormData();
        formData.append("branch_name", form.branch_name);
        formData.append("branch_code", form.branch_code);
        formData.append("province_id", form.province_id.value);
        formData.append("regency_id", form.regency_id.value);
        formData.append("district_id", form.district_id.value);
        formData.append("villages_id", form.villages_id.value);
        formData.append("is_radius_active", form.is_radius_active ? 1 : 0);
        formData.append("address", form.address);
        formData.append("latitude", form.latitude);
        formData.append("longitude", form.longitude);
        if (form.is_radius_active) {
          formData.append("attendance_radius", form.attendance_radius);
        }
        formData.append("work_type", form.work_type.value);

        await http
          .post("company-branch", formData)
          .then(() => {
            setLoadingSubmit(false);
            notifSuccess("Success", "Branch created successfully");
            history.push("/branch");
          })
          .catch((err) => {
            const status = err.response.status;
            if (status > 400) {
              notifError("Failed", "Please check required input");
              setLoadingSubmit(false);
            } else {
              setLoadingSubmit(false);
              defaultNotifError("Create Branch");
            }
          });
      }
    });
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    fetchDataProvince();
    return () => {
      setDataFilter({
        provinces: [],
      });
    };
  }, []);

  if (!isLoaded) {
    return <div>....</div>;
  }

  return (
    <Fragment>
      <CustomModalDetail
        show={modalMap}
        handleClose={() => {
          setModalMap(false);
          setForm({ ...form, latitude: 0, longitude: 0 });
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
          setForm({
            ...form,
            latitude: defaultLocation.lat,
            longitude: defaultLocation.lng,
          });
          setModalMap(false);
        }}
      />
      <h1 className="mt-4 breadcumb my-4">Add New Branch</h1>
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
      <div className="row">
        <div className="col-12">
          <div className="card card-shadow">
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
                    className="form-control input-border-grey"
                    value={form.branch_name}
                    onChange={(e) => onChangeText(e)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="branch_name" className="text-bold">
                    Branch Code
                  </label>
                  <input
                    type="text"
                    name="branch_code"
                    required
                    className="form-control input-border-grey"
                    value={form.branch_code}
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
                  <Select
                    id="province_id"
                    name="province_id"
                    required
                    options={dataFilter.provinces}
                    styles={filterStyles}
                    isClearable={false}
                    onChange={(e) => selectFilterHandler(e, "regencies")}
                    placeholder={"Select Provinces..."}
                    value={form.province_id}
                  />
                </div>

                {/* REGENCY */}
                <div className="form-group col-xl-3 col-lg-4 col-md-6">
                  <label htmlFor="regency_id" className="text-bold">
                    Regency
                  </label>
                  <Select
                    id="regency_id"
                    required
                    options={
                      form.province_id === null || form.province_id.value === ""
                        ? null
                        : dataFilter.regencies
                    }
                    styles={filterStyles}
                    isClearable={false}
                    isDisabled={
                      form.province_id === null || form.province_id.value === ""
                    }
                    onChange={(e) => selectFilterHandler(e, "districts")}
                    placeholder={
                      loadingFilter.regencies
                        ? "Fetching..."
                        : "Select Regencies..."
                    }
                    value={form.regency_id}
                  />
                </div>

                {/* DISTRICTS */}
                <div className="form-group col-xl-3 col-lg-4 col-md-6">
                  <label htmlFor="district_id" className="text-bold">
                    District
                  </label>
                  <Select
                    id="district_id"
                    name="district_id"
                    required
                    options={dataFilter.districts}
                    styles={filterStyles}
                    isClearable={false}
                    isDisabled={
                      form.regency_id === null || form.regency_id.value === ""
                    }
                    onChange={(e) => selectFilterHandler(e, "villages")}
                    placeholder={"Select Districts..."}
                    value={form.district_id}
                  />
                </div>

                {/* VILLAGES */}
                <div className="form-group col-xl-3 col-lg-4 col-md-6">
                  <label htmlFor="villages_id" className="text-bold">
                    Villages
                  </label>
                  <Select
                    id="villages_id"
                    name="villages_id"
                    required
                    options={dataFilter.villages}
                    styles={filterStyles}
                    isClearable={false}
                    onChange={(e) => setForm({ ...form, villages_id: e })}
                    isDisabled={form.district_id.value === ""}
                    placeholder={"Select Villages..."}
                    value={form.villages_id}
                  />
                </div>
              </div>

              {/* ADDRESS */}
              <div className="row mt-3">
                <div className="form-group col-md-12">
                  <label htmlFor="" className="text-bold">
                    Address
                  </label>
                  <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                    children={
                      <input
                        type="text"
                        required
                        name="address"
                        onChange={(e) => onChangeText(e)}
                        id=""
                        className="form-control input-border-grey"
                      />
                    }
                  />
                  <div className="form-check">
                    <input
                      onChange={() => {
                        if (form.is_radius_active) {
                          setForm({ ...form, is_radius_active: false });
                        } else {
                          setForm({ ...form, is_radius_active: true });
                        }
                      }}
                      value={form.is_radius_active}
                      checked={form.is_radius_active}
                      className="form-check-input"
                      name="is_radius_active"
                      type="checkbox"
                      id="is_radius_active"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck1">
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
              {form.is_radius_active ? (
                <div className="row mt-3">
                  <div className="form-group col-12">
                    <label htmlFor="attendance_radius" className="text-bold">
                      Attendance Radius (IN METER)
                    </label>
                    <input
                      type="number"
                      required
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
                  <ButtonBlueFilter
                    name="Select Map (REQUIRED)"
                    onClick={() => setModalMap(true)}
                  />
                </div>
              </div>
              {/* WORKING SYSTEM */}
              <div className="row mt-3">
                <div className="form-group col-12">
                  <label htmlFor="work_type" className="text-bold">
                    Working System
                  </label>
                  <Select
                    id="work_type"
                    name="work_type"
                    required
                    options={WORKING_SYSTEM}
                    styles={filterStyles}
                    isClearable={false}
                    onChange={(e) => setForm({ ...form, work_type: e })}
                    placeholder={"Working System"}
                    value={form.work_type}
                  />
                </div>
              </div>

              <div className="btn-group mt-3">
                <button
                  type="button"
                  onClick={(e) => onSubmit(e)}
                  className="btn btn-blue"
                  disabled={loadingSubmit}
                >
                  {loadingSubmit ? "Creating..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddBranch;
