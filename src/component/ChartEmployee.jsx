import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Chart, registerables, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { sumArray } from "../utils/helper";
import http from "../service/PrivateConfigRequest";
import LegendChart from "./LegendChart";

Chart.register(...registerables);
Chart.register(ArcElement);

const ChartEmployee = () => {
  const [dataEmployee, setDataEmployee] = useState([]);
  const [totalEmployee, setTotalEmployee] = useState("");
  const [loadingChart, setLoadingChart] = useState(false);

  /**
   * Request Get Data Employee Male and Female for chart
   * @returns {JSON}
   */
  const requestChartEmployee = async () => {
    return await http.get("dashboard/chart-employee");
  };

  /**
   * Callback for request get chart employee
   */
  const fetchChartEmployee = useCallback(() => {
    setLoadingChart(true);
    return requestChartEmployee()
      .then((res) => {
        let data = res.data.data;
        setDataEmployee(data);
        setTotalEmployee(sumArray(data).toString());
        setLoadingChart(false);
      })
      .catch((err) => {
        alert("Error When Fetching Chart Data Employee. Please Reload Page");
        setLoadingChart(false);
      });
  }, []);

  useEffect(() => {
    fetchChartEmployee();
    return () => {
      setDataEmployee([]);
      setTotalEmployee("");
      setLoadingChart(false);
    };
  }, [fetchChartEmployee]);

  const styles = {
    pieContainer: {
      width: "39%",
      height: "40%",
      top: "66%",
      left: "51%",
      position: "absolute",
      transform: "translate(-50%, -50%)",
    },
    relative: {
      width: "100%",
      height: "65%",
      position: "relative",
      marginRight: "auto",
      marginLeft: "auto",
    },
  };

  const dataMale = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "# of Votes",
        data: dataEmployee,
        backgroundColor: ["rgba(74, 211, 254, 1)", "rgba(241, 252, 255, 1)"],
        borderColor: ["rgba(74, 211, 254, 1)", "rgba(241, 252, 255, 1)"],
        hoverOffset: 50,
        borderWidth: 1,
        borderRadius: [50, 50],
      },
    ],
  };

  const dataFemale = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "# of Votes",
        data: dataEmployee,
        backgroundColor: ["rgba(255, 240, 232, 1)", "rgba(255, 108, 25, 1)"],
        borderColor: ["rgba(255, 240, 232, 1)", "rgba(255, 108, 25, 1)"],
        borderRadius: [50, 50],
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 100).toFixed(2);
        ctx.font = "bold " + fontSize + "em Roboto";
        ctx.textBaseline = "top";
        var text = totalEmployee,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillStyle = "rgba(0, 97, 127, 1)";
        ctx.fillText(text, textX, textY);

        var fontSizeNew = (height / 150).toFixed(2);
        ctx.font = fontSizeNew + "em Roboto";
        ctx.textColor = "red";
        ctx.textBaseline = "top";
        var textNew = "Total",
          textNewX = Math.round((width - ctx.measureText(textNew).width) / 2),
          textNewY = height / 3;
        ctx.fillStyle = "rgba(170, 170, 170, 1)";
        ctx.fillText(textNew, textNewX, textNewY);

        ctx.save();
      },
    },
  ];

  if (loadingChart) {
    return (
      <Fragment>
        <p>Fetching Data Chart....</p>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="row">
          <div className="col-6">
            <div className="" style={styles.relative}>
              <Doughnut
                data={dataMale}
                options={{
                  plugins: {
                    legend: false,
                  },
                  rotation: 100,
                  radius: "70%",
                  cutout: "70%",
                  responsive: true,
                }}
              />
              <div className="" style={styles.pieContainer}>
                <Doughnut
                  data={dataFemale}
                  plugins={plugins}
                  options={{
                    plugins: {
                      legend: false,
                    },
                    responsive: true,
                    rotation: 100,
                    cutout: "60%",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <LegendChart
              dataOneIcon={`${process.env.PUBLIC_URL}/assets/img/blue_label.png`}
              dataTwoIcon={`${process.env.PUBLIC_URL}/assets/img/orange_label.png`}
              dataOne={dataEmployee[0]}
              dataTwo={dataEmployee[1]}
              dataOneLabel="Male"
              dataTwoLabel="Female"
            />
          </div>
        </div>
      </Fragment>
    );
  }
};

export default ChartEmployee;
