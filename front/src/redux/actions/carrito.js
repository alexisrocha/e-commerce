import axios from "axios";
import { USERCART } from '../constanst'

const carritoDeUser = (cart) =>{
    return {
        type:USERCART,
        cart
    }
}


export const agregarCarrito = (carrito) =>{
    return dispatch =>{
        return axios.post('/api/carrito/agregarProducto', carrito)
    };
};


export const buscarCarrito = () =>{
    return dispatch =>{
        return axios.get(`/api/carrito`)
            .then(res => dispatch(carritoDeUser(res.data)));
    };
};

export const deleteProductCarrito = (carritoId , productId) =>{
    return dispatch => {
        return axios.delete(`/api/carrito/${carritoId}/${productId}`);
    };
};

export const updateProductSumar = (carritoProducts) => {
    return dispatch => {
        return axios.put('/api/carrito/sumar', carritoProducts);
    };
};
export const updateProductRestar = (carritoProducts) => {
    return dispatch => {
        return axios.put('/api/carrito/restar', carritoProducts);
    };
};

export const finalCarrito = (id , carritoFinalizado) =>{
    return dispatch =>{
        return axios.put(`/api/carrito/${id}`, carritoFinalizado);
    }
};

export const storageCart = (obj) =>{
    return dispatch => {
        return axios.post(`/api/carrito/agregarStorage`, obj)
    }
}