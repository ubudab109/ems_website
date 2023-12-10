import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Chart, registerables, ArcElement } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import LegendChart from './LegendChart';
import http from '../service/PrivateConfigRequest';

Chart.register(...registerables);
Chart.register(ArcElement);

const ChartWorkplaces = () => {
  const [dataWorkPlace, setDataWorkPlace] = useState([]);
  const [loadingChart, setLoadingChart] = useState(false);

  /**
   * Request Get Data Employee Male and Female for chart
   * @returns {JSON}
   */
  const requestChartEmployee = async () => {
    return await http.get('dashboard/chart-workplaces');
  }

  /**
   * Callback for request get chart employee
   */
  const fetchChartEmployee = useCallback(() => {
    setLoadingChart(true);
    return requestChartEmployee().then((res) => {
      let data = res.data.data;
      setDataWorkPlace(data);
      setLoadingChart(false);
    }).catch((err) => {
      alert('Error When Fetching Chart Data Employee. Please Reload Page');
      setLoadingChart(false);
    });
  }, []);

  useEffect(() => {
    fetchChartEmployee();
    return () => {
      setDataWorkPlace([]);
      setLoadingChart(false);
    };
  }, [fetchChartEmployee]);

  const styles = {
    pieContainer: {
      width: "40%",
      height: "40%",
      top: "50%",
      left: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)"
    },
    relative: {
      width: "100%",
      height: "65%",
      position: "relative",
      marginRight: 'auto',
      marginLeft: 'auto',
    }
  };

  const dataOnsite = {
    labels: ['On Site', 'Remote'],
    datasets: [
      {
        label: '# of Votes',
        data: dataWorkPlace,
        backgroundColor: [
          'rgba(25, 89, 255, 1)',
          'rgba(234, 240, 255, 1)',
        ],
        borderColor: [
          'rgba(25, 89, 255, 1)',
          'rgba(234, 240, 255, 1)',
        ],
        hoverOffset: 50,
        borderWidth: 1,
        borderRadius: [
          50,
          50,
        ]
      },
    ],
  };

  const dataRemote = {
    labels: ['On Site', 'Remote'],
    datasets: [
      {
        label: '# of Votes',
        data: dataWorkPlace,
        backgroundColor: [
          'rgba(254, 226, 255, 1)',
          'rgba(250, 0, 255, 1)',
        ],
        borderColor: [
          'rgba(254, 226, 255, 1)',
          'rgba(250, 0, 255, 1)',
        ],
        borderRadius: [
          50,
          50,
        ]
      },
    ],
  };


  if (loadingChart) {
    return (
      <Fragment>
        <p>Fetching Data Chart....</p>
      </Fragment>
    );
  } else {
    if (dataWorkPlace[0] === 0 && dataWorkPlace[1] === 0) {
      return (
        <Fragment>
          <div>
          Nothing logged in today
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <div className="" style={styles.relative}>
            <Doughnut
              data={dataOnsite}
              options={{
                plugins: {
                  legend: false,
                },
                rotation: 100,
                radius: '70%',
                cutout: '70%',
                responsive: true,
              }}
            />
            <div className="" style={styles.pieContainer}>
              <Doughnut
                data={dataRemote}
                options={{
                  plugins: {
                    legend: false
                  },
                  responsive: true,
                  rotation: 100,
                  cutout: '60%',
                }}
              />
            </div>
          </div>
          <LegendChart
            dataOneIcon={`${process.env.PUBLIC_URL}/assets/img/blue_dark_label.png`}
            dataTwoIcon={`${process.env.PUBLIC_URL}/assets/img/purple_label.png`}
            dataOne={dataWorkPlace[0]}
            dataTwo={dataWorkPlace[1]}
            dataOneLabel="On Site"
            dataTwoLabel="Remote"
          />
        </Fragment>
      );
    }
  }
};

export default ChartWorkplaces;
