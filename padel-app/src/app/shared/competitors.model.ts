export class Competitor {
    public user_id: number;
    public name: string;
    public dni: number;
    public lastname: string;

    constructor(id: number, name: string, lastname:string, dni: number) {
        this.user_id = id;
        this.name = name;
        this.lastname = lastname;
        this.dni = dni;

    }
}