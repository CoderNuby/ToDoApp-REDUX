export class Todo{

    constructor(texto: string){
        this.texto = texto;
        this.id = Math.random();
        this.completado = false;
    }

    public id: number;
    public texto: string;
    public completado: boolean;
}