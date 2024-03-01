"use client";
import { useEffect, useState } from 'react';

import axios from 'axios';
import React from 'react';

type Tclothes = {
    id?: number;
    name: string;
    talla: string;
    color: string;
}
type TRes = {
    msg: string;
    data?: any
}


const headers = {
    headers: {
        "Content-Type": "application/json",
    }
}

export default function CrudclothesPage() {
    useEffect(() => {
        getclothes();
    }, []);

    const [clothes, setclothes] = useState<Tclothes[]>([]);
    const [prenda, setprenda] = useState<Tclothes>({  
        name: "",
        talla: "",
        color: "",
    });

    const [isEditable, setIsEditable] = useState(false);

    const onChange = (e: any) => {
        const data: any = prenda;
        data[e.target.name] = e.target.value;
        setprenda(data);
    }



    const getclothes = async () => {
        try {
            const response = await axios.get<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/get`);

            if (response.data.data) {
                setclothes(response.data.data);
            }
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const createclothes = async () => {
        try {
            await axios.post<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/create`, prenda, headers);
            getclothes();
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const updateprenda = async (id:number) => {
        try {
            await axios.put<TRes>(
                `${process.env.NEXT_PUBLIC_API_REST_URL}/update/${id}`,
                prenda,
                headers
            );
            getclothes();
            setIsEditable(false);
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const deleteprenda = async (id: number) => {
        try {
            await axios.delete<TRes>(
                `${process.env.NEXT_PUBLIC_API_REST_URL}/delete/${id}`,
            );
            getclothes();
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const preUpdate = (e:Tclothes) => {
        setprenda(e);
        setIsEditable(true);
    }

    return (
        <div>
            <h1>CRUD De Prenda</h1>
            <div>
                <label htmlFor="name">Ingresa el nombre de la prenda:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            name='name'
                            defaultValue={prenda.talla}
                            placeholder='Nombre'
                        /><br/>
                        <label htmlFor="talla">ingresa la talla de la prenda:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            name='talla'
                            defaultValue={prenda.talla}
                            placeholder='talla'
                        /><br/>
                        <label htmlFor="color">ingresa el color de la prenda:</label><br />
                        <input
                           type="text"
                           onChange={(e) => onChange(e)}
                           name='color'
                           defaultValue={prenda.talla}
                           placeholder='color'
                /><br/>
            </div>
            <button onClick={createclothes}>Agregar prenda</button>
            <table>
                <tr>
                    <th>Nombre</th>  
                    <th>talla</th>
                    <th>color</th>
                    <th>Opciones</th>
                </tr>
                {clothes.map((prenda, index) => (
                    <tr key={index}>
                        <td>{prenda.name}</td> 
                        <td>{prenda.talla}</td>
                        <td>{prenda.color}</td>
                        <td>
                            <button onClick={() => deleteprenda(prenda.id ?? 0)}>Delete</button>
                        </td>
                        <td>
                            <button onClick={() => preUpdate(prenda)}>Update</button>
                        </td>
                    </tr>
                ))}
            </table>

            {
                isEditable && (
                    <div>
                        <h2>Formulario para actualizar</h2>
                        <label htmlFor="name">Ingresa el nombre de la prenda:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            name='name'
                            defaultValue={prenda.talla}
                            placeholder='Nombre'
                        /><br/>
                        <label htmlFor="talla">ingresa la talla de la prenda:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            name='talla'
                            defaultValue={prenda.talla}
                            placeholder='talla'
                        /><br/>
                        <label htmlFor="color">ingresa el color de la prenda:</label><br />
                        <input
                           type="text"
                           onChange={(e) => onChange(e)}
                           name='color'
                           defaultValue={prenda.talla}
                           placeholder='color'
                        /><br/>
                        
                        <button onClick={() => updateprenda(prenda.id ?? 0)}>Guardar</button>
                    </div>
                )
            }
        </div>
    );
}
