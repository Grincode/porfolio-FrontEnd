export class Proyecto {
    id? : number;
    nombreP : string;
    descripcionP : string;
    imagenP: string;
    fechaP: string;
    linkP: string;

    constructor(nombreP: string, descripcionP: string, imagenP: string, fechaP: string, linkP: string) {
        this.nombreP = nombreP;
        this.descripcionP = descripcionP;
        this.imagenP = imagenP;
        this.fechaP = fechaP;
        this.linkP = linkP;
        
    }
}