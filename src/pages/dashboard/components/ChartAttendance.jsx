import React, { useEffect, useState } from 'react';
import CardShadow from '../../../component/CardShadow';
import ProgressBar from '../../../component/ProgressBar';
import LegendThreeChart from './LegendThreeChart';

const ChartAttendance = () => {
  const [isLoadedChartAttendance, setIsLoadedChartAttendance] = useState(false);

  const totalData = 20;
  const dummyData = [
    { bgcolor: "#34C759", completed: 15, label: 'On Time' },
    { bgcolor: "#FFC900", completed: 3, label: 'Late' },
    { bgcolor: "#FF1111", completed: 1, label: 'Absent' },
  ];

  useEffect(() => {
    setIsLoadedChartAttendance(true);
    return () => {
      setIsLoadedChartAttendance(false);
    }
  }, [])
  return (
    <CardShadow title="Attendance">
      <div className="col-12">
        <div className="progress-wrapper">
          {
            dummyData.map((item, i) => (
              <ProgressBar
                key={i}
                bgcolor={item.bgcolor}
                progress={item.completed}
                height={25}
                total={totalData}
                isLoaded={isLoadedChartAttendance}
              />
            ))
          }
        </div>
      </div>
      <div className="col-12" style={{
        marginTop: '73px',
      }}>
        <LegendThreeChart
          dataOneIcon={`${process.env.PUBLIC_URL}/assets/img/green_label.png`}
          dataTwoIcon={`${process.env.PUBLIC_URL}/assets/img/yellow_label.png`}
          dataThreeIcon={`${process.env.PUBLIC_URL}/assets/img/red_label.png`}
          dataOne={dummyData[0]['completed']}
          dataTwo={dummyData[1]['completed']}
          dataThree={dummyData[2]['completed']}
          dataOneLabel={dummyData[0]['label']}
          dataTwoLabel={dummyData[1]['label']}
          dataThreeLabel={dummyData[2]['label']}
        />
      </div>
    </CardShadow>
  );
};

export default ChartAttendance;
