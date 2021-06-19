import { Injectable } from '@angular/core';
import { SortBy, SortDirection } from '../enums/enums';
import { Person } from '../model/person.model';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  constructor() { }

  public sort(people:Person[], sortBy:SortBy, sortDirection:SortDirection):Person[] {
    switch (sortBy) {
      case SortBy.Id:
        return (sortDirection === SortDirection.Asc) ? people.sort((a, b) => b.id - a.id) : people.sort((a, b) => a.id - b.id);
      case SortBy.FirstName:
        return (sortDirection === SortDirection.Asc) ? people.sort((a, b) => b.firstName.localeCompare(a.firstName)) : people.sort((a, b) => a.firstName.localeCompare(b.firstName));
      case SortBy.LastName:
        return (sortDirection === SortDirection.Asc) ? people.sort((a, b) => b.lastName.localeCompare(a.lastName)) : people.sort((a, b) => a.lastName.localeCompare(b.lastName));
      case SortBy.EmploymentDate:
        return (sortDirection === SortDirection.Asc) ? people.sort((a, b) => b.employmentDate.getTime() - a.employmentDate.getTime()) : people.sort((a, b) => a.employmentDate.getTime() - b.employmentDate.getTime());
      case SortBy.Gender:
        return (sortDirection === SortDirection.Asc) ? people.sort((a, b) => b.gender.localeCompare(a.gender)) : people.sort((a, b) => a.gender.localeCompare(b.gender));
      case SortBy.City:
        return (sortDirection === SortDirection.Asc) ? people.sort((a, b) => b.city.localeCompare(a.city)) : people.sort((a, b) => a.city.localeCompare(b.city));
    }
  }
}
