import axios from "axios";
const API_HOST = "https://reqres.in/api/users";

const List = async (page) => {
  //TODO: Implement list api
  try {
    const response = axios.get(`${API_HOST}?page=${page}`);

    return await response;
  } catch (error) {
    console.log(error);
  }
};

const Get = async (id) => {
  //TODO: Implement get api
  try {
    const response = await axios.get(`${API_HOST}/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const Save = async (user) => {
  //TODO: Implement save api
  try {
    if (user.id) {
      const response = await axios.put(`${API_HOST}/${user.id}`, user);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const Delete = async (id) => {
  //TODO: Implement delete api
  try {
    const response = await axios.delete(`${API_HOST}/user.${id}`);
    return response.data;
    // console.log(response.);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { List, Get, Save, Delete };
