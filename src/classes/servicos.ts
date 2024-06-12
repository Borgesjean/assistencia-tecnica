export class Servicos {
    id: string;
    tempoConclusao: string;
    descricao: string;
    preco: number;
    computadorId: string;
    clienteId: string;
    tecnicoId: string;
    

    constructor(id: string, tempoConclusao: string, descricao: string, preco: number, computadorId: string, tecnicoId: string, clienteId: string) {
        this.id = id;
        this.clienteId = clienteId;
        this.computadorId = computadorId;
        this.tecnicoId = tecnicoId;
        this.tempoConclusao = tempoConclusao;
        this.descricao = descricao;
        this.preco = preco;
    }
}