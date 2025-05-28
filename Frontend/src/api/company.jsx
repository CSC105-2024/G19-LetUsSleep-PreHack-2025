import { Axios } from "../util/axiosInstance";

// Get company by ID
export const getCompanyAPIbyID = async (id) => {
  try {
    const response = await Axios.get(`company/${id}`); // single slash
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

// // Get all companies
// export const getAllCompanyAPI = async () => {
//   try {
//     const response = await Axios.get(`/company`); // GET /company (no /:id)
//     return {
//       success: true,
//       data: response.data
//     }
//   } catch (e) {
//     console.log(e);
//     return {
//       success: false,
//       data: null
//     }
//   }
// }

// Create company
export const createCompanyAPI = async (data) => {
  try {
    const response = await Axios.post(`/company`, data); // POST /company
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

// Update company by ID
export const updateCompanyAPI = async (id, data) => {
  try {
    const response = await Axios.patch(`/company/${id}`, data); // PATCH /company/:id
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

// Delete company by ID
export const deleteCompanyAPI = async (id) => {
  try {
    const response = await Axios.delete(`/company/${id}`); // DELETE /company/:id
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