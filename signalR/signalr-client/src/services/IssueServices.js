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
