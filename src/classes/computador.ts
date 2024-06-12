export class Computador {
    id: string;
    dono: string;
    problema: string;
    dataChegada: string;
    dataSaida: string;

    constructor(id: string, dono: string, problema: string, dataChegada: string, dataSaida: string) {
        this.id = id;
        this.dono = dono;
        this.problema = problema;
        this.dataChegada = dataChegada;
        this.dataSaida = dataSaida;
    }
}
