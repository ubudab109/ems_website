/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { yearsOption } from '../../../utils/helper';
import { MONTH_LIST } from '../../../utils/constant';
import http from '../../../service/PrivateConfigRequest';

const Overtime = ({ id }) => {
  const date = new Date();
  const [dataOverTime, setDataOvertime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const yearsFilter = yearsOption();
  const [filterOvertime, setFilterOvertime] = useState({
    month: MONTH_LIST[date.getMonth()],
    year: {
      value: date.getFullYear(),
      label: date.getFullYear(),
    },
    status: {
      value: '',
      label: 'All (Default)'
    }
  });
  const [detailOvertime, setDetailOvertime] = useState({});
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [errorDetailOvertime, setErrorDetailOvertime] = useState(false);
  const [errorDetailMessage, setErrorDetailMessages] = useState('');
  const [showModalDetailOvertime, setShowModalDetailOvertime] = useState(false);
  const [formEditOvertime, setFormEditOvertime] = useState({});
  const [showModalEditOvertime, setShowModalEditOvertime] = useState(false);

  /**
   * This function returns a promise that resolves to the result of an HTTP GET request.
   * Request for get list overtime
   * @param {string} month
   * @param {string} year
   * @param {string} status
   * @returns {array} An array with a property called data.
   */
  const requestDataOvertime = async (month, year, status) => {
    return await http.get(`employee/${id}?type=overtime&date[month]=${month}&date[year]=${year}&status=${status}`);
  };

  /* A callback function that returns a promise that resolves to the result of an HTTP GET request. */
  const callbackDataOvertime = useCallback(() => {
    let month = filterOvertime.month.value;
    let year = filterOvertime.year.value;
    let status = filterOvertime.status.value;
    return requestDataOvertime(month, year, status);
  }, [filterOvertime.month, filterOvertime.status, filterOvertime.year]);
  
  /**
   * Request Get Detail Overtime
   * @param {number} overtimeId
   * @returns {Promise}
   */
  const requestDetailOvertime = async (overtimeId) => {
    return await http.get(`employee-overtime/${overtimeId}`);
  }


  /**
   * On View Click Handler
   * @param {number} attendanceId
   * @param {string} type
   */
  const onViewDetail = (overtimeId, type) => {
    if (type === 'detail') {
      setShowModalDetailOvertime(true);
    } else if (type === 'edit') {
      setShowModalEditOvertime(true);
    }

    setIsFetchingDetail(true);
    requestDetailOvertime(overtimeId)
    .then(res => {
      let data = res.data.data.data;
      let formEdit = {
        id: data.id,
        
      }
    })
  }

}