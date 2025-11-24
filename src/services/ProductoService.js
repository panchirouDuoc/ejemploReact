import axios from "axios";
const baseUrl = "http://localhost:8080/api/productos";

const getConfig = (token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

class ProductoService {

    getAllProductos() {
        return axios.get(baseUrl);
    }

    getProductoById(id) {
        return axios.get(`${baseUrl}/${id}`);
    }

    createProducto(producto, token) {
        return axios.post(baseUrl, producto, getConfig(token));
    }

    updateProducto(id, producto, token) {
        return axios.put(`${baseUrl}/${id}`, producto, getConfig(token));
    }

    deleteProducto(id, token) {
        return axios.delete(`${baseUrl}/${id}`, getConfig(token));
    } 
}

export default new ProductoService();
