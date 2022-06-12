import {axiosInstance} from '../helpers/axios_config';


const getTipoEquipo = () => {
    return axiosInstance.get('tipo-equipo',{
        headers: {
            'Content-type': 'application/jason'
        }
    })
}

const crearTipoEquipo = (data) => {
    return axiosInstance.post('tipo-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });

}

const editTipoEquipo = (tipoequipoId, data) => {
    return axiosInstance.put(`tipo-equipo/${tipoequipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });

}



export{
    getTipoEquipo, crearTipoEquipo, editTipoEquipo
}