import React, { Fragment, useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import http from "../service/PrivateConfigRequest";

const ChartAttendance = ({ gapChart }) => {
  const [isLoadedChartAttendance, setIsLoadedChartAttendance] = useState(false);
  const [dataAttendance, setDataAttendance] = useState([]);
  const [totalEmployee, setTotalEmployee] = useState(0);

  /**
   * FETCHING DATA ATTENDANCE GRAPH
   */
  const fetchDataAttendanceChart = async () => {
    setIsLoadedChartAttendance(true);
    await http.get("dashboard/attendance").then((res) => {
      const data = res.data.data.graph;
      /* BG COLOR FOR EACH TYPE OF ATTENDANCE AND LEAVE BASED ON INDEX */
      let background = [
        "#34C759", // On Time
        "#FFC900", // Late
        "#FF1111", // Absent
        "#BB3FC6", // Paid Leave
        "#FF5900", // Permit
      ];

      /* LABEL FOR EACH TYPE OF ATTENDANCE AND LEAVE BASED ON INDEX */
      let label = ["On Time", "Late", "Absent", "Paid Leave", "Permit"];
      let chart = [];
      for (let i = 0; i < data.length; i++) {
        // WE ONLY GET THE TOTAL ATTENDANCE AND LEAVE DATA
        // THE LAST INDEX IS A TOTAL OF EMPLOYEE IN CURRENT BRANCH
        if (i !== data.length - 1) {
          let item = {
            bgcolor: background[i],
            completed: data[i],
            label: label[i],
          };
          chart.push(item);
        } else {
          setTotalEmployee(data[i]);
        }
      }
      setDataAttendance(chart);
      setIsLoadedChartAttendance(false);
    });
  };

  /**
   * COMPONENT DID MOUNT
   */
  useEffect(() => {
    fetchDataAttendanceChart();
    return () => {
      setDataAttendance([]);
      setTotalEmployee(0);
    };
  }, []);
  return (
    <Fragment>
      <div className="col-12">
        <div className="progress-wrapper">
          {isLoadedChartAttendance ? (
            <Fragment>
              <span>Fetching...</span>
            </Fragment>
          ) : (
            dataAttendance.map((item, i) => (
              <ProgressBar
                key={i}
                label={item.label}
                bgcolor={item.bgcolor}
                progress={item.completed}
                height={25}
                total={totalEmployee}
                marginBottom={gapChart}
              />
            ))
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ChartAttendance;
