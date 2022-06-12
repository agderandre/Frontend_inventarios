import {axiosInstance} from '../helpers/axios_config';


const getMarcas = () => {
    return axiosInstance.get('marca',{
        headers: {
            'Content-type': 'application/jason'
        }
    })
}

const crearMarcas = (data) => {
    return axiosInstance.post('marca', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });

}

const editMarcas = (marcaId, data) => {
    return axiosInstance.put(`marca/${marcaId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });

}



export{
    getMarcas, crearMarcas, editMarcas
}