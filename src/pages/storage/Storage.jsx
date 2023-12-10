import React, { useState, Fragment, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

import http from "../../service/PrivateConfigRequest";
import { concatSpaceString, defaultNotifError } from "../../utils/helper";
import { useHistory } from "react-router-dom";

const Storage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  /**
   * FETCHING DATA AND ASSIGN TO STATE
   */
  const fetchData = async () => {
    setIsLoading(true);
    await http
      .get("dataset/excel-model")
      .then((res) => {
        const data = res.data.data;
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        defaultNotifError("Fetching Folder");
      });
  };

  /**
   * On View Click Handler
   * @param {String} name
   */
   const onViewDetail = (name) => {
    history.push(`/storage/files/${name}`);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb my-4">Storage</h1>
      <div className="row">
        <div className="col-12">
          <div className="card card-shadow">
            <div className="card-body">
              <div className="row">
                {isLoading ? (
                  <span>Fetching...</span>
                ) : (
                  data.map((value, key) => (
                    <div className="col-xl-2 col-md-4" key={key} style={{ cursor: 'pointer' }} onClick={() => {
                      let concatString = concatSpaceString(value.name);
                      let toLower = concatString.toLowerCase();
                      onViewDetail(toLower);
                    }}>
                      <div className="card" style={{ boxShadow: "none" }}>
                        <div className="card-body p-3">
                          <div>
                            <div className="float-start">
                              <FontAwesomeIcon icon={faFolder} color="#f1b44c" />
                            </div>
                            <div className="d-flex">
                              <div className="overflow-hidden mx-2 mt-1">
                                <h5 className="font-14 text-truncate mb-1">{value.name}</h5>
                                <p className="text-muted text-truncate mb-0">{value.total_files} files</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Storage;
