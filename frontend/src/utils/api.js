import axios from "axios";

// const API = axios.create({ baseURL: "http://ec2-13-51-200-78.eu-north-1.compute.amazonaws.com:5000/api" });

// const API = axios.create({baseURL:"http://localhost:5000/api"});
const API = axios.create({baseURL:"https://taxease.onrender.com/api"});

const token = localStorage.getItem('token');

// User-related API calls
export const login = (formData) => API.post("/users/login", formData);
export const register = (formData) => API.post("/users/register", formData);

// Finance-related API calls
export const addEntry = async ({token, userid, ...data }) => {
    return await API.post('/finance/add', {...data, userid}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };

export const getEntries = async ({token, userid}) => {
    return await API.post("/finance/all",{userid },{
      headers: {
        'Authorization' :`Bearer ${token}`
      }
    });
};

export const deleteEntry = async ({id,token}) => {
    return await API.delete(`/finance/delete/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    });
};

//Tax calculation related
export const calculateTax = (data) => API.post("/calculatetax/calculate", data);
export const getProjections = (data) => API.post("/calculatetax/projections", data);

//optimizationTax
export const getSuggestions = (data) => API.post("/optimization/suggestions", data);

export const autoFillTaxForm = async (formData) => {
    return await API.post("/tax/auto-fill", formData);
};

export const validateTaxForm = async (formData) => {
    return await API.post("/tax/validate", formData);
};

//TaxForm
export const autoFill = async({token, ...data}) => {
  return await API.post("/tax/auto-fill", {...data},{
    headers:{
      'Authorization':`Bearer ${token}`
    }
  });
}
  
export const validate = async({token, ...data}) =>{
  return await API.post("/tax/validate", {...data},{
    headers:{
      'Authorization':`Bearer ${token}`
    }
  });
};
export const submitForm =async({token, ...data}) =>{
  return await API.post("/tax/submit", {...data},{
    headers:{
      'Authorization':`Bearer ${token}`
    }
  });
} 

export const dashData =async() =>{
  return await API.get("/dashboard/dashboard-data",{
    headers:{
      'Authorization':`Bearer ${token}`
    }
  });
} 
