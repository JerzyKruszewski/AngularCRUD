export class Person {
    private _id: number;
    public firstName:string;
    public lastName:string;
    public employmentDate:Date;
    public gender:string;
    public city:string;

    constructor(
        id: number,
        firstName:string,
        lastName:string,
        employmentDate:Date,
        gender:string,
        city:string
    ) {
        this._id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.employmentDate = employmentDate;
        this.gender = gender;
        this.city = city;
    }

    public get id(): number {
        return this._id;
    }
}