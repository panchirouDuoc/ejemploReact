import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

class CarritoService {
    getCarrito() {
        return apiClient.get('/carrito');
    }

    agregarProducto(idProducto, cantidad = 1) {
        return apiClient.post('/carrito/agregar', { idProducto, cantidad });
    }

    actualizarCantidad(idProducto, cantidad) {
        return apiClient.put(`/carrito/producto/${idProducto}`, { cantidad });
    }

    eliminarProducto(idProducto) {
        return apiClient.delete(`/carrito/producto/${idProducto}`);
    }

    limpiarCarrito() {
        return apiClient.delete('/carrito');
    }
}

export default new CarritoService();
