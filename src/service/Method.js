import http from "./PrivateConfigRequest"
import qs from 'qs';


const getAll = async (endpoint, show, keyword, page) => {
  return await http.get(`/${endpoint}?show=${show}&keyword=${keyword}&page=${page}`);
}

const getTrashed = async (endpoint, show, keyword, page, status) => {
  return await http.get(`/${endpoint}?show=${show}&keyword=${keyword}&page=${page}&status=${status}`);
}

const getDataset = async (endpoint) => {
  return await http.get(`/dataset/${endpoint}`);
}

const getId = (endpoint, id) => {
  return http.get(`/${endpoint}/${id}`);
}

const deleteById = async (endpoint, id) => {
  return await http.delete(`/${endpoint}/${id}`);
}

const restoreById = async (endpoint, id) => {
  return await http.patch(`/${endpoint}/${id}`);
}

const createDataWithOneUpload = async (endpoint, data) => {
  return await http.post(`/${endpoint}`, data);
}

const createDataWithoutUpload = async (endpoint, data) => {
  return await http.post(`/${endpoint}`, data);
}

const updateDataById = async (endpoint, id, data) => {
  return await http.post(`/${endpoint}/${id}`, data);
}

const updateDataByIdWithPut = async (endpoint, id, data) => {
  return await http.put(`/${endpoint}/${id}`, qs.stringify(data),
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
}

const method = {
  getAll,
  getTrashed,
  getId,
  getDataset,
  deleteById,
  restoreById,
  createDataWithOneUpload,
  createDataWithoutUpload,
  updateDataById,
  updateDataByIdWithPut
};

export default method;
