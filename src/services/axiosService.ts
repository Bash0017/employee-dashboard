import { configure } from "axios-hooks";
import Axios from "axios";

const axiosService = Axios.create({
  baseURL: "https://procom-interview-employee-test.azurewebsites.net",
});

configure({ axios: axiosService });
