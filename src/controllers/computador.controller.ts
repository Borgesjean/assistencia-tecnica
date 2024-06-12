import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";
import { Computador } from "../classes/computador";

const localStorage = new LocalStorage('./scratch');
const STORAGE_KEY = 'computador';

const verComputadoresArmazenados = (): Computador[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const salvarComputador = (computador: Computador[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(computador));
};

export const adicionarComputador = (req: Request, res: Response): void => {
    const computadores = verComputadoresArmazenados();
    const novoComputador: Computador = new Computador(uuidv4(), req.body.dono, req.body.problema, req.body.dataChegada, req.body.dataSaida);
    computadores.push(novoComputador);
    salvarComputador(computadores);
    res.status(201).json(novoComputador);
};

export const verComputador = (req: Request, res: Response): void => {
    const computador = verComputadoresArmazenados();
    res.json(computador);
};

export const atualizarComputador = (req: Request, res: Response): void => {
    const { id } = req.params
    const computadorAtualizado: Computador = new Computador(id, req.body.dono, req.body.problema, req.body.dataChegada, req.body.dataSaida);
    const computador = verComputadoresArmazenados();
    const index = computador.findIndex(p => p.id === id);
    if(index !== -1) {
        computador[index] = computadorAtualizado
        salvarComputador(computador);
        res.json(computadorAtualizado);
    } else {
        res.status(404).json({ message: 'Computador não encontrado' });
    }
};

export const excluirComputador = (req: Request, res: Response): void => {
    const { id } = req.params;
    const computador = verComputadoresArmazenados();
    const filtrarComputadores = computador.filter(p => p.id !== id);
    salvarComputador(filtrarComputadores);
    res.status(204).send();
};