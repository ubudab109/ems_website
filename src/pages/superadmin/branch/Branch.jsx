/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useCallback, useState, useEffect } from "react";
import Select from "react-select";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";
import SearchFilterInput from "../../../component/SearchFilterInput";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";
import http from "../../../service/PrivateConfigRequest";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";
import ButtonWhiteFilter from "../../../component/ButtonWhiteFilter";
import { defaultNotifError } from "../../../utils/helper";
import branchData from "./data/branch_data";

const Branch = () => {
  const history = useHistory();
  const [filterData, setFilterData] = useState({
    keyword: "",
    province: {
      name: "province",
      label: "Provinces",
      value: "",
    },
    regency: {
      name: "regency",
      label: "Regencies",
      value: "",
    },
    district: {
      name: "district",
      label: "Districts",
      value: "",
    },
    village: {
      name: "villages",
      label: "Villages",
      value: "",
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
  const [dataBranch, setDataBranch] = useState([]);
  const [loadingBranch, setLoadingBranch] = useState(false);

  /**
   * REQUEST DATA BRANCH
   * @param {string} keyword
   * @param {number} province
   * @param {number} regency
   * @param {number} district
   * @param {number} villages
   * @returns {Promise}
   */
  const requestBranch = async (
    keyword,
    province,
    regency,
    district,
    villages
  ) => {
    return await http.get(
      `company-branch?
      show=all&keyword=${keyword}
      &province=${province}&regency=${regency}
      &district=${district}&villages=${villages}`
    );
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
   * FETCH DATA BRANCH FROM CALLBACK
   * @param {string | null} keyword
   * @param {string | null} province
   * @param {string | null} regency
   * @param {string | null} district
   * @param {string | null} village
   */
  const fetchDataBranch = (
    keyword = null,
    province = null,
    regency = null,
    district = null,
    village = null
  ) => {
    setLoadingBranch(true);
    requestBranch(
      keyword !== null ? keyword : filterData.keyword,
      province !== null ? province : filterData.province.value,
      regency !== null ? regency : filterData.regency.value,
      district !== null ? district : filterData.district.value,
      village !== null ? village : filterData.village.value
    )
      .then((res) => {
        const data = res.data.data;
        setDataBranch(data);
        setLoadingBranch(false);
      })
      .catch(() => {
        defaultNotifError("Fetching Branch");
        setLoadingBranch(false);
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
        setFilterData({
          ...filterData,
          province: e,
          regency: {
            name: "regency",
            label: "Regencies",
            value: "",
          },
          district: {
            name: "district",
            label: "Districts",
            value: "",
          },
          village: {
            name: "villages",
            label: "Villages",
            value: "",
          },
        });
        fetchDataRegencies(e.value);
        break;
      case "districts":
        setFilterData({
          ...filterData,
          regency: e,
          district: {
            name: "district",
            label: "Districts",
            value: "",
          },
          village: {
            name: "villages",
            label: "Villages",
            value: "",
          },
        });
        fetchDataDistricts(e.value);
        break;
      case "villages":
        setFilterData({
          ...filterData,
          district: e,
          village: {
            name: "villages",
            label: "Villages",
            value: "",
          },
        });
        fetchDataVillages(e.value);
        break;
      default:
        return null;
    }
  };

  const viewDetail = (id) => {
    history.push(`/branch/detail/${id}`)
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    fetchDataProvince();
    fetchDataBranch();
    return () => {
      setDataFilter({
        provinces: [],
      });
      setDataBranch([]);
    };
  }, []);

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb">Branch</h1>
      <div className="row">
        <div className="col-12">
          <div className="row">
            {/* KEYWORD SEARCH */}
            <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 mb-2">
              <SearchFilterInput
                onChangeInput={(e) => {
                  setFilterData({
                    ...filterData,
                    keyword: e.target.value,
                  });
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    fetchDataBranch();
                  }
                }}
                input={filterData.keyword}
                canFilter={false}
              />
            </div>

            {/* FILTER PROVINCIES */}
            <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 mb-2">
              {/* FILTER PROVINCIES */}
              <Select
                id="status"
                className="high-index"
                options={dataFilter.provinces}
                styles={filterStyles}
                isClearable={false}
                onChange={(e) => selectFilterHandler(e, "regencies")}
                placeholder={"Select Provinces..."}
                value={filterData.province}
              />
            </div>

            {/* FILTER REGENCIES */}
            <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 mb-2">
              {/* FILTER REGENCIES */}
              <Select
                id="status"
                className="high-index"
                options={
                  filterData.province === null ||
                  filterData.province.value === ""
                    ? null
                    : dataFilter.regencies
                }
                styles={filterStyles}
                isClearable={false}
                isDisabled={
                  filterData.province === null ||
                  filterData.province.value === ""
                }
                onChange={(e) => selectFilterHandler(e, "districts")}
                placeholder={
                  loadingFilter.regencies
                    ? "Fetching..."
                    : "Select Regencies..."
                }
                value={filterData.regency}
              />
            </div>

            {/* FILTER DISTRICTS */}
            <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 mb-2">
              {/* FILTER DISTRICTS */}
              <Select
                id="status"
                className="high-index"
                options={dataFilter.districts}
                styles={filterStyles}
                isClearable={false}
                isDisabled={
                  filterData.regency === null || filterData.regency.value === ""
                }
                onChange={(e) => selectFilterHandler(e, "villages")}
                placeholder={"Select Districts..."}
                value={filterData.district}
              />
            </div>

            {/* FILTER VILLAGES */}
            <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 mb-2">
              {/* FILTER VILLAGES */}
              <Select
                id="status"
                className="high-index"
                options={dataFilter.villages}
                styles={filterStyles}
                isClearable={false}
                onChange={(e) => setFilterData({ ...filterData, village: e })}
                isDisabled={filterData.district.value === ""}
                placeholder={"Select Villages..."}
                value={filterData.village}
              />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="btn-group">
              <ButtonWhiteFilter
                name="Reset Filter"
                onClick={() => {
                  setFilterData({
                    keyword: "",
                    province: {
                      name: "province",
                      label: "Provinces",
                      value: "",
                    },
                    regency: {
                      name: "regency",
                      label: "Regencies",
                      value: "",
                    },
                    district: {
                      name: "district",
                      label: "Districts",
                      value: "",
                    },
                    village: {
                      name: "villages",
                      label: "Villages",
                      value: "",
                    },
                  });
                  fetchDataBranch("", "", "", "", "");
                }}
              />
              <ButtonBlueFilter
                name="Apply Filter"
                onClick={() => fetchDataBranch()}
              />
            </div>
          </div>
        </div>
      </div>
      {/* DATA HERE */}
      <div className="card card-shadow">
        <div className="card-body">
          <div className="table-responsive">
            <div className="float-end mb-2">
              <ButtonBlueFilter name="Add Branch" onClick={() => history.push('/branch/add/create-branch')} />
            </div>
            <DataTable
              columns={branchData(viewDetail)}
              data={dataBranch}
              pagination
              progressPending={loadingBranch}
              fixedHeader
              fixedHeaderScrollHeight={"61vh"}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Branch;
