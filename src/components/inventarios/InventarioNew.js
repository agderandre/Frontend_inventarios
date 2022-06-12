import React, {useState, useEffect} from 'react'
import {getEstadoEquipo} from '../../services/EstadoEquipoService'
import {getMarcas} from '../../services/MarcaService'
import {getTipoEquipo} from '../../services/TipoEquipoService'
import {getUsuarios} from '../../services/usuarioService'
import {crearInventarios} from '../../services/inventarioService'
import Swal from 'sweetalert2';


export const InventarioNew = ({ handleOpenModal, listarInventarios }) => {

    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const {serial='', modelo='', descripcion='', color='', foto='', fechaCompra='', precio='', usuario, marca, tipo, estado } = valoresForm;

    const listarUsuarios = async () => {
        try{
            const {data} = await getUsuarios();
            setUsuarios(data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        listarUsuarios()
    }, []);

    const listarMarcas = async () => {
        try{
            const {data} = await getMarcas();
            setMarcas(data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        listarMarcas()
    }, []);

    const listarTipos = async () => {
        try{
            const {data} = await getTipoEquipo();
            setTipos(data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        listarTipos()
    }, []);

    const listarEstados = async () => {
        try{
            const {data} = await getEstadoEquipo();
            setEstados(data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        listarEstados()
    }, []);

    const handleOnChange= ({target}) => {
        const {name, value} = target;
        setValoresForm({...valoresForm,[name]: value})
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, foto, fechaCompra, precio, 
            usuario: {
                _id: usuario
            },
            marca:{
                _id: marca
            },
            tipoEquipo:{
                _id: tipo
            },
            estadoEquipo:{
                _id: estado
            }
        }

        console.log(inventario);
        try{
            Swal.fire({
                allowOutsideClick: false,
                text:'Cargando....'
            });
            Swal.showLoading();
            const { data } = await crearInventarios(inventario);
            console.log(data);
            Swal.close();
            handleOpenModal();
            listarInventarios();
        }catch(error){
            console.log(error);
            Swal.close();
        }

    }

    return (
        <div className='sidebar'>
            <div className='container_fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nuevo inventario</h3>
                            <i className="fa-solid fa-xmark" onClick={handleOpenModal} ></i>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                </div>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input type="text" name='serial' required
                                value={serial}
                                onChange={(e)=> handleOnChange(e)}
                                className="form-control" />
                            </div>

                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Modelo</label>
                                <input type="text" name='modelo' required value={modelo} onChange={(e)=> handleOnChange(e)} className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Descripcion</label>
                                <input type="text" name='descripcion' required value={descripcion} onChange={(e)=> handleOnChange(e)} className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Color</label>
                                <input type="text" name='color' required value={color} onChange={(e)=> handleOnChange(e)} className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Foto</label>
                                <input type="url" name='foto' required value={foto} onChange={(e)=> handleOnChange(e)} className="form-control" />
                            </div>

                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Fecha Compra</label>
                                <input type="date" name='fechaCompra' required value={fechaCompra} onChange={(e)=> handleOnChange(e)} className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Precio</label>
                                <input type="Number" name='precio' required value={precio} onChange={(e)=> handleOnChange(e)} className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <select className="form-select" required onChange={(e)=> handleOnChange(e)} name='usuario' value={usuario}>
                                    <option value=''>--Seleccione--</option>
                                    {
                                        usuarios.map(usuario =>{
                                            return <option key={usuario.id} value={usuario._id}>{usuario.nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Marca</label>
                                <select className="form-select" required onChange={(e)=> handleOnChange(e)} name='marca' value={marca}>
                                    <option value=''>--Seleccione--</option>
                                    {
                                        marcas.map(marcas =>{
                                            return <option key={marcas.id} value={marcas._id}>{marcas.nombre}</option>
                                        })
                                    }
                                </select>
                            </div>

                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Tipo Equipo</label>
                                <select className="form-select" required onChange={(e)=> handleOnChange(e)} name='tipo' value={tipo}>
                                    <option value=''>--Seleccione--</option>
                                    {
                                        tipos.map(tipos =>{
                                            return <option key={tipos.id} value={tipos._id}>{tipos.nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Estado Equipo</label>
                                <select className="form-select" required onChange={(e)=> handleOnChange(e)} name='estado' value={estado}>
                                    <option value=''>--Seleccione--</option>
                                    {
                                        estados.map(estados =>{
                                            return <option key={estados.id} value={estados._id}>{estados.nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <button className="btn btn-success">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
