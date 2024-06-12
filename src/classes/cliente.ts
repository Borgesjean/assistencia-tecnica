export class Cliente {
    id: string;
    nome: string;
    endereco: string;
    telefone: string;

    constructor(id: string, nome: string, telefone: string, endereco: string) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco
        this.telefone = telefone;
    }
}