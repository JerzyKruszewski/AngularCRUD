import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from 'src/app/model/person.model';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  public renderAddForm:boolean = false;
  public renderEditForm:boolean = false;
  public edittedPerson:Person | undefined;
  public people:Person[] | undefined;

  private readonly NotEnoughInformation:string = "Provided invalid information";
  private readonly InvalidDate:string = "Provided date was invalid";

  constructor(private peopleService:PeopleService) { }

  ngOnInit(): void {
    this.people = this.peopleService.onGet();
  }

  /**
   * Change add person form visibility
   */
  onAddPersonClick():void {
    this.renderAddForm = !this.renderAddForm;
  }

  /**
   * Change edit person form visibility
   */
  onEditClick(person:Person):void {
    if (this.edittedPerson === person) {
      this.edittedPerson = undefined;
      this.renderEditForm = false;
      return;
    }

    this.edittedPerson = person;
    this.renderEditForm = true;
  }

  /**
   * Try to add person to database
   */
  onAdd(form:NgForm):void {
    if (form.form.valid === false) {
      alert(this.NotEnoughInformation);
      return;
    }

    const firstName:string = form.form.value["firstName"];
    const lastName:string = form.form.value["lastName"];
    const employmentDate:Date = new Date(form.form.value["employmentDate"]);

    if (this.isValidDate(employmentDate) === false) {
      alert(this.InvalidDate);
      return;
    }

    const gender:string = form.form.value["gender"];
    const city:string = form.form.value["city"];
      
    this.people = this.peopleService.onAdd(firstName, lastName, employmentDate, gender, city);

    this.renderAddForm = false;
  }

  /**
   * Try to update person in database
   */
  onEdit(form:NgForm):void {
    const firstName:string = (form.form.value["firstName"]) ? form.form.value["firstName"] : this.edittedPerson?.firstName;
    const lastName:string = (form.form.value["lastName"]) ? form.form.value["lastName"] : this.edittedPerson?.lastName;
    let employmentDate:Date = new Date(form.form.value["employmentDate"]);

    if (this.isValidDate(employmentDate) === false) {
      employmentDate = <Date>this.edittedPerson?.employmentDate;
    }

    const gender:string = (form.form.value["gender"]) ? form.form.value["gender"] : this.edittedPerson?.gender;
    const city:string = (form.form.value["city"]) ? form.form.value["city"] : this.edittedPerson?.city;
    
    this.people = this.peopleService.onUpdate(<number>this.edittedPerson?.id, firstName, lastName, employmentDate, gender, city);

    this.edittedPerson = undefined;
    this.renderEditForm = false;
  }

  /**
   * Try to delete person from database
   */
  onDelete(id:number):void {
    this.people = this.peopleService.onDelete(id);
  }

  /**
   * Validate if given parameter is valid Date
   */
  isValidDate(date:any):boolean {
    if (Object.prototype.toString.call(date) === "[object Date]") {
      if (isNaN(date.getTime())) { 
        return false;
      }

      return true;
    }

    return false;
  }
}
