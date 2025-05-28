import { Axios } from "../util/axiosInstance";

export const createJobAPI = async (data) => {
    console.log("Creating job with data:", data);
  try {
    const response = await Axios.post("/job", data);
    return {
      success: true,
      data: response.data
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: null
    }
  }
}
