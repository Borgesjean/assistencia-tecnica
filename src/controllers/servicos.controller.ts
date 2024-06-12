import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";
import { Servicos } from "../classes/servicos";
import { Computador } from "../classes/computador";
import { Cliente } from "../classes/cliente";
import { Tecnico } from "../classes/tecnico";

const localStorage = new LocalStorage('./scratch');
const STORAGE_KEY = 'servicos';
const CLIENTE_KEY = 'clientes';
const COMPUTADOR_KEY = 'computador';
const TECNICO_KEY = 'tecnico';

const verServicosArmazenados = (): Servicos[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const salvarServico = (servicos: Servicos[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
};

const pegaClienteArmazenado = (): Cliente[] => {
    const data = localStorage.getItem(CLIENTE_KEY);
    return data ? JSON.parse(data) : []; 
};

const pegaComputadorArmazenado = (): Cliente[] => {
    const data = localStorage.getItem(COMPUTADOR_KEY);
    return data ? JSON.parse(data) : []; 
};

const pegaTecnicoArmazenado = (): Cliente[] => {
    const data = localStorage.getItem(TECNICO_KEY);
    return data ? JSON.parse(data) : []; 
};

export const criarServicos = (req: Request, res: Response) => {
    const { clienteId, computadorId, tecnicoId , tempoConclusao, descricao, preco } = req.body;

    const cliente = pegaClienteArmazenado();
    const computador = pegaComputadorArmazenado();
    const tecnico = pegaTecnicoArmazenado();

    const clienteExiste = cliente.find(c => c.id === clienteId);
    const computadorExiste = computador.find(p => p.id === computadorId);
    const tecnicoExiste = tecnico.find(t => t.id === tecnicoId);

    if(!clienteExiste || !computadorExiste || !tecnicoExiste) {
        return res.status(404).json({ message: 'Cliente, computador ou tecnico não entocntrado' })
    }
    
    const servicos = verServicosArmazenados();
    const novoServico = new Servicos(uuidv4(), clienteId, computadorId, tecnicoId, tempoConclusao, descricao, preco);
    servicos.push(novoServico);
    salvarServico(servicos);
    res.status(201).json(novoServico);
};

export const verServicos = (req: Request, res: Response): void => {
    const servicos = verServicosArmazenados();
    res.json(servicos);
};

export const atualizarServicos = (req: Request, res: Response) => {
    const { id } = req.params;
    const { clienteId, computadorId, tecnicoId, tempoConclusao, descricao, preco } = req.body

    const cliente = pegaClienteArmazenado();
    const computador = pegaComputadorArmazenado();
    const tecnico = pegaTecnicoArmazenado();

    const clienteExiste = cliente.find(c => c.id === clienteId);
    const computadorExiste = computador.find(p => p.id === computadorId);
    const tecnicoExiste = tecnico.find(t => t.id === tecnicoId);

    if(!clienteExiste || !computadorExiste || !tecnicoExiste) {
        return res.status(404).json({ message: 'Cliente, computador ou tecnico não entocntrado' })
    }

    const servicos = verServicosArmazenados();
    const index = servicos.findIndex(s => s.id === id);
    
    if(index !== -1) {
        const servicoAtualizado = new Servicos(id, clienteId, 
        computadorId, tecnicoId, tempoConclusao, descricao, preco,)

        servicos[index] = servicoAtualizado

        salvarServico(servicos);

        res.json(servicoAtualizado);
    } else {
        res.status(404).json({ message: 'Serviço não encontrado' });
    }
};

export const excluirServicos = (req: Request, res: Response): void => {
    const { id } = req.params;
    const servicos = verServicosArmazenados();
    const filtrarServicos = servicos.filter(s => s.id !== id);
    salvarServico(filtrarServicos);
    res.status(204).send();
};