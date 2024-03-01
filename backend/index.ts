import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';

type Tclothes = {
    id:number;
    name:string;
    talla:string;
    color:string;
}

let clothes: Tclothes[] = [
    {
        id:1,
        name:"calzon",
        talla:"xl",
        color:"marron",
    }
]


export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // app.use((req, res, next) => {
    //     if (ic.caller().isAnonymous()) {
    //         res.status(401);
    //         res.send();
    //     } else {
    //         next();
    //     }
    // });

    app.post('/create',(req, res)=>{
        const prenda = clothes.find((prenda)=>prenda.id === parseInt(req.body.id));
        if(prenda){
            res.status(400).json({msg:"El id ya esta en uso.", data:prenda});
            return;
        }
        req.body.id = clothes[clothes.length - 1].id + 1;
        clothes.push(req.body);
        res.status(200).json({msg:"prenda añadida exitosamente"});
    });

    app.get('/get',(req,res)=>{
        res.status(200).json({msg:"prenda añadida con exito", data:clothes});
    });

    app.put('/update/:id', (req, res)=>{
        const prenda = clothes.find((prenda)=>prenda.id === parseInt(req.params.id));

        if(!prenda){
            res.status(404).json({msg:"la prenda a actualizar no existe."});
            return;
        }

        const Uprenda = {...prenda, ...req.body};

        clothes = clothes.map((e) => e.id === Uprenda.id ? Uprenda : e);

        res.status(200).json({msg:"la prenda se actualizo con exito"});
    });

    app.delete('/delete/:id',(req, res)=>{
        clothes = clothes.filter((e) => e.id !== parseInt(req.params.id));
        res.status(200).json({msg:"la prenda se elimino con exito", data:clothes});
    });

    app.post('/test', (req, res) => {
        res.json(req.body);
    });

    app.get('/whoami', (req, res) => {
        res.statusCode = 200;
        res.send(ic.caller());
    });

    app.get('/health', (req, res) => {
        res.send().statusCode = 204;
    });

    return app.listen();
});
