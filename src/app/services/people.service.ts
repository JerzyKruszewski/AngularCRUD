import { Injectable } from '@angular/core';
import { Person } from '../model/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  people:Person[] = [
    new Person(0, "Tim", "Corey", new Date(2020, 4, 13), "Male", "Example City"),
    new Person(1, "Emma", "Stone", new Date(2020, 6, 13), "Female", "Example City"),
    new Person(2, "Lorem", "Ipsum", new Date(2020, 4, 23), "Male", "LoremIpsum")
  ];

  constructor() { }

  /**
   * Get people array
   */
  onGet():Person[] {
    return this.people;
  }

  /**
   * Add person to people array
   */
  onAdd(
    firstName:string,
    lastName:string,
    employmentDate:Date,
    gender:string,
    city:string
  ):Person[] {
    const ids:number[] = this.people.map(p => p.id);

    const nextId:number = Math.max(...ids) + 1;

    this.people.push(new Person(nextId, firstName, lastName, employmentDate, gender, city));

    return this.people;
  }

  /**
   * Update existing person or add new if person doesn't exist
   */
  onUpdate(
    id: number,
    firstName:string,
    lastName:string,
    employmentDate:Date,
    gender:string,
    city:string
    ):Person[] {
    const indexToUpdate:number = this.people.findIndex(p => p.id === id);

    if (indexToUpdate === -1) {
      return this.onAdd(firstName, lastName, employmentDate, gender, city);
    }

    this.people[indexToUpdate].firstName = firstName
    this.people[indexToUpdate].lastName = lastName
    this.people[indexToUpdate].employmentDate = employmentDate
    this.people[indexToUpdate].gender = gender
    this.people[indexToUpdate].city = city

    return this.people;
  }

  /**
   * Delete person with given id. Do nothing if it doesn't exist.
   */
  onDelete(id:number):Person[] {
    const index:number = this.people.findIndex(p => p.id === id);

    if (index === -1) {
      return this.people;
    }
    
    this.people.splice(index, 1);

    return this.people;
  }
}
