import axios from "axios";

const API = axios.create({ baseURL: "http://ec2-13-51-200-78.eu-north-1.compute.amazonaws.com:5000/api" });

// User-related API calls
export const login = (formData) => API.post("/users/login", formData);
export const register = (formData) => API.post("/users/register", formData);

// Finance-related API calls
export const addEntry = async (data) => {
    return await API.post("/finance/add", data);
};

export const getEntries = async () => {
    return await API.get("/finance/all");
};

export const deleteEntry = async (id) => {
    return await API.delete(`/finance/delete/${id}`);
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
