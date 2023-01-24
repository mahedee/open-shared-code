import axios from "axios";
import { BASE_URL } from "../utils/Settings";

export const getAllIssues = () => {
  //const response = getData("api/Issues");
  //return response;

  try {
    const response = axios.get(BASE_URL + `api/Issues`);
    console.log("After axios");
    //console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const PostIssue = (data) => {
  try {
    console.log("input data: ", data);
    const response = axios.post(BASE_URL + "api/Issues", data);
    return response;
  } catch (error) {
    return error.message;
  }
};
