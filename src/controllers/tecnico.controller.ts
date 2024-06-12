import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";
import { Tecnico } from "../classes/tecnico";

const localStorage = new LocalStorage('./scratch');
const STORAGE_KEY = 'tecnico';

const verTecnicosArmazenados = (): Tecnico[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const salvarTecnico = (tecnico: Tecnico[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tecnico));
};

export const adicionarTecnico = (req: Request, res: Response): void => {
    const tecnico = verTecnicosArmazenados();
    const novoTecnico: Tecnico = new Tecnico(uuidv4(), req.body.nome, req.body.cpf, req.body.telefone);
    tecnico.push(novoTecnico);
    salvarTecnico(tecnico);
    res.status(201).json(novoTecnico);
};

export const verTecnicos = (req: Request, res: Response): void => {
    const tecnico = verTecnicosArmazenados();
    res.json(tecnico);
};

export const atualizarTecnico = (req: Request, res: Response): void => {
    const { id } = req.params
    const tecnicoAtualizado: Tecnico = new Tecnico(id, req.body.nome, req.body.cpf, req.body.data.telefone);
    const tecnico = verTecnicosArmazenados();
    const index = tecnico.findIndex(t => t.id === id);
    if(index !== -1) {
        tecnico[index] = tecnicoAtualizado
        salvarTecnico(tecnico);
        res.json(tecnicoAtualizado);
    } else {
        res.status(404).json({ message: 'Tecnico não encontrado' });
    }
};

export const excluirTecnico = (req: Request, res: Response): void => {
    const { id } = req.params;
    const tecnico = verTecnicosArmazenados();
    const filtrarTecnicos = tecnico.filter(t => t.id !== id);
    salvarTecnico(filtrarTecnicos);
    res.status(204).send();
};