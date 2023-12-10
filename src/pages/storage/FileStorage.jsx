/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  defaultNotifError,
  excelModel,
  notifSuccess,
} from "../../utils/helper";
import http from "../../service/PrivateConfigRequest";
import { useCallback } from "react";
import DataTable from "react-data-table-component";
import excelFileData from "./data/excel_file_data";
import swal from "sweetalert";
import ButtonPlaint from "../../component/ButtonPlaint";

const FileStorage = () => {
  const history = useHistory();
  const { name } = useParams();
  const model = excelModel(name);
  const endpointRetry = {
    "App\\Models\\Payroll": "retry-export-payslip",
    "App\\Models\\EmployeeReimburshment": "retry-export-reimbursement",
  }

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * REQUEST LIST FILES BASED ON TYPE MODEL
   * @param {String} type
   * @return {Promise}
   */
  const requestGetFiles = async (type) => {
    return await http.get(`excel?model=${type}`);
  };

  /**
   * CALLBACK FROM REQUEST GET FILES
   */
  const callbackGetFiles = useCallback(() => {
    let type = model;
    return requestGetFiles(type);
  }, [model]);

  /**
   * FETCHING DATA FILES FROM CALLBACK
   */
  const fetchDataFiles = () => {
    setIsLoading(true);
    callbackGetFiles()
      .then((res) => {
        const data = res.data.data;
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        defaultNotifError("Fetching Files");
      });
  };

  /**
   * HANDLE RETRY TASK
   * @param {Number} id
   */
  const retry = async (id, sourceType) => {
    swal({
      title: "Retry",
      text: "Are You sure want to retry this task?",
      buttons: true,
      icon: "warning",
      dangerMode: true,
    }).then(async (isYes) => {
      if (isYes) {
        const url = endpointRetry[sourceType];
        await http
          .post(`${url}/${id}`)
          .then((res) => {
            notifSuccess("Success", "Task Retried Successfully");
            fetchDataFiles();
          })
          .catch(() => {
            defaultNotifError("Retry task");
          });
      } else {
        return null;
      }
    });
  };

  /**
   * HANDLE REFRESH DATA
   */
  const refresh = () => {
    fetchDataFiles();
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    fetchDataFiles();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb my-4">Files {name}</h1>
      <div className="row">
        <div className="col-12 pl-25">
          <button
            className="btn btn-white-filter"
            onClick={() => history.push("/storage")}
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
            <div className="card-body" style={{ width: "100%" }}>
              <div className="d-flex flex-wrap mb-3">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="btn-group btn-group-xl float-end">
                    <ButtonPlaint
                      name="Refresh"
                      onClick={() => refresh()}
                    />
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <DataTable
                  columns={excelFileData(retry)}
                  data={data}
                  progressPending={isLoading}
                  pagination
                  fixedHeader
                  fixedHeaderScrollHeight={"61vh"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FileStorage;
