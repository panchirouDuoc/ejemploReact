import axios from "axios";
const baseUrl = "http://localhost:8080/api/productos";

class ProductoService {

    getAllProductos(){
    return axios.get(baseUrl);
    }
    getProductoById(id){
    return axios.get(`${baseUrl}/${id}`);
    }
    createProducto(producto){
    return axios.post(baseUrl, producto);
    }
    updateProducto(id, producto){
    return axios.put(`${baseUrl}/${id}`, producto);
    }
    deleteProducto(id){
    return axios.delete(`${baseUrl}/${id}`);
    } 
}
export default new ProductoService();