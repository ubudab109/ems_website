/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, Fragment } from "react";
import swal from "sweetalert";
import Select from "react-select";
import DataTable from "react-data-table-component";
import { yearsOption } from "../../../utils/helper";
import { MONTH_LIST } from "../../../utils/constant";
import http from "../../../service/PrivateConfigRequest";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";
import columnEmployeePermit from "../data/column_employee_permit";
import CustomModalDetail from "../../../component/CustomModalDetail";
import DetailPermit from "../../../component/DetailPermit";

const Permit = ({ id }) => {
  const date = new Date();
  const [dataPermit, setDataPermit] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const yearsFilter = yearsOption();
  const [filterPermit, setFilterPermit] = useState({
    month: MONTH_LIST[date.getMonth()],
    year: {
      value: date.getFullYear(),
      label: date.getFullYear(),
    },
  });
  const [detailPermit, setDetailPermit] = useState({});
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [errorDetailPermit, setErrorDetailPermit] = useState({
    status: false,
    message: "",
  });

  const requestDataPermit = async (month, year) => {
    return await http.get(
      `employee/${id}?type=permit&date[month]=${month}&date[year]=${year}`
    );
  };

  const callbackDataPermit = useCallback(() => {
    let month = filterPermit.month.value;
    let year = filterPermit.year.value;
    return requestDataPermit(month, year);
  }, [filterPermit]);

  const requestDetailPermit = async (permitId) => {
    return await http.get(`employee-paid-leave/${permitId}`);
  };

  const onViewDetail = (permitId) => {
    setShowModalDetail(true);
    setIsFetchingDetail(true);
    requestDetailPermit(permitId)
      .then((res) => {
        let data = res.data.data.data;
        setDetailPermit(data);
        setIsFetchingDetail(false);
      })
      .catch(() => {
        setIsFetchingDetail(false);
        setErrorDetailPermit({
          status: true,
          message:
            "Failed. There's an error when fetching data. Please try again. If error still showing, You can contact the administrator",
        });
      });
  };

  const handleCloseModalDetailPermit = () => {
    setShowModalDetail(false);
    setErrorDetailPermit({ status: false, message: "" });
  };

  const fetchDataPermit = () => {
    setIsLoading(true);
    callbackDataPermit()
      .then((res) => {
        let data = res.data.data;
        setDataPermit(data);
        setIsLoading(false);
      })
      .catch(() => {
        swal({
          title: "Error When Fetching Data",
          text: "Check Your connection or contact us if the problem still there",
          icon: "error",
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDataPermit();
    return () => {
      setDataPermit([]);
    };
  }, [callbackDataPermit]);

  return (
    <Fragment>
      <CustomModalDetail
        show={showModalDetail}
        handleClose={handleCloseModalDetailPermit}
        headerTitle="Detail Employee Permit"
        children={
          isFetchingDetail ? (
            <div className="row">
              <div className="col-12">Fetching Detail....</div>
            </div>
          ) : (
            <DetailPermit
              startDate={detailPermit ? detailPermit.start_date : ""}
              endDate={detailPermit ? detailPermit.end_date : ""}
              taken={detailPermit ? detailPermit.taken : ""}
              desc={detailPermit ? detailPermit.desc : ""}
              employee={
                detailPermit && detailPermit.employee
                  ? detailPermit.employee
                  : {}
              }
              department={
                detailPermit && detailPermit.department
                  ? detailPermit.department
                  : {}
              }
              files={
                detailPermit && detailPermit.files ? detailPermit.files : []
              }
              isError={errorDetailPermit.status}
            />
          )
        }
      />
      <div className="col-sm-12">
        <h5 className="text-blue-dark p-3">Employee Permit</h5>
        <div className="d-flex flex-wrap justify-content-start mb-2">
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 mb-3 p-3">
            {/* FILTER */}
            <div className="row">
              {/* MONTH FILTER */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-2">
                <Select
                  id="status"
                  className="high-index"
                  options={MONTH_LIST}
                  styles={filterStyles}
                  isClearable={false}
                  onChange={(e) => {
                    setFilterPermit({
                      ...filterPermit,
                      month: e,
                    });
                  }}
                  value={filterPermit.month}
                />
              </div>

              {/* YEAR  */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-2">
                <Select
                  id="status"
                  className="high-index"
                  options={yearsFilter}
                  styles={filterStyles}
                  isClearable={false}
                  onChange={(e) => {
                    setFilterPermit({
                      ...filterPermit,
                      year: e,
                    });
                  }}
                  value={filterPermit.year}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <DataTable
            columns={columnEmployeePermit(onViewDetail)}
            data={dataPermit}
            pagination
            progressPending={isLoading}
            fixedHeader
            fixedHeaderScrollHeight={"100vh"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Permit;
