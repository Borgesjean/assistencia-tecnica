import { Router } from "express";
const router = Router();

import {
    adicionarComputador,
    verComputador,
    atualizarComputador,
    excluirComputador
} from './controllers/computador.controller';

import {
    criarClientes,
    verClientes,
    atulaizarClientes,
    excluirClientes
} from './controllers/cliente.controller'

import {
    criarServicos,
    verServicos,
    atualizarServicos,
    excluirServicos
} from './controllers/servicos.controller'

import {
    adicionarTecnico,
    verTecnicos,
    atualizarTecnico,
    excluirTecnico
} from './controllers/tecnico.controller'

router.post('/computadores', adicionarComputador);
router.get('/computadores', verComputador);
router.put('/computadores/:id', atualizarComputador);
router.delete('/computadores/:id', excluirComputador);

router.post('/clientes', criarClientes);
router.get('/clientes', verClientes);
router.put('/clientes/:id', atulaizarClientes);
router.delete('/clientes/:id', excluirClientes);

router.post('/tecnicos', adicionarTecnico);
router.get('/tecnicos', verTecnicos);
router.put('/tecnicos/:id', atualizarTecnico);
router.delete('/tecnicos/:id', excluirTecnico);

router.post('/servicos', criarServicos);
router.get('/servicos', verServicos);
router.put('/servicos/:id', atualizarServicos);
router.delete('/servicos/:id', excluirServicos);

export default router;