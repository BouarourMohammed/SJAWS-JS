import axios from "axios";
import { apiData } from "./appInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

export const create = async (data, url) => {
  try {
    const token = await getToken();
    return await axios.post(`${apiData.REACT_APP_API}/${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// used in calculate screen
export const editByIdAuth = async (values, url, id) => {
  try {
    const token = await getToken();
    return await axios.put(`${apiData.REACT_APP_API}/${url}/${id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllAuth = async (url) => {
  try {
    const token = await getToken();
    return await axios.get(`${apiData.REACT_APP_API}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getByIdAuth = async (url, id) => {
  try {
    const token = await getToken();
    return await axios.get(`${apiData.REACT_APP_API}/${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// used in calculate screen
export const createCalculation = async (values, url) => {
  try {
    const token = await getToken();
    return await axios.post(`${apiData.REACT_APP_API}/${url}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteByIdAuth = async (url, id) => {
  try {
    const token = await getToken();

    return await axios.delete(`${apiData.REACT_APP_API}/${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//used in results screens
export const getResults = async (url) => {
  try {
    const token = await getToken();
    return await axios.get(`${apiData.REACT_APP_API}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
