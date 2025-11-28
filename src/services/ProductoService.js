import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productos';

const createAuthHeaders = (token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

const ProductoService = {
    // publico
    getAllPublicProductos: () => {
        return axios.get(API_URL);
    },

    // Admin
    getAllProductos: (token) => {
        return axios.get(API_URL, createAuthHeaders(token));
    },

    getProductoById: (id) => {
        return axios.get(`${API_URL}/${id}`);
    },

    createProducto: (producto, token) => {
        return axios.post(API_URL, producto, createAuthHeaders(token));
    },

    updateProducto: (id, producto, token) => {
        return axios.put(`${API_URL}/${id}`, producto, createAuthHeaders(token));
    },

    deleteProducto: (id, token) => {
        return axios.delete(`${API_URL}/${id}`, createAuthHeaders(token));
    }
};

export default ProductoService;
