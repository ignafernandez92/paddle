export class Competitor {
    public name: string;
    public dni: number;
    public lastname: string;

    constructor(name: string, lastname:string, dni: number) {
        this.name = name;
        this.lastname = lastname;
        this.dni = dni;

    }
}