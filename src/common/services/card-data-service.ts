import {Injectable, OnDestroy} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AuthenticationService} from './authentication-service';
import { Subscription }   from 'rxjs/Subscription';
import {IEmployee} from '../../app/models/employee-model';
import 'rxjs/add/operator/toPromise';
import {RestServiceError} from './RestServiceError';
import {IProject} from "../../app/models/project-model";
import { ISkill } from "../../app/models/skill-model";

let {API_URL} = require('app-config');

let options = new RequestOptions({
  headers: new Headers({ 'Content-Type': 'application/json' })
});

@Injectable()
export class CardDataService implements OnDestroy {

  cards: any[] = [];
  fetched: boolean = false;

  constructor(private _http: Http) {
  }

  ngOnDestroy() {
  }

  createEmployee(employee: IEmployee): Promise<number> {
    let body = JSON.stringify(employee);
    return this._http.post(`${API_URL}/api/employees/`, body, options)
      .toPromise()
      .then((res) => {
          const body = res.json();
          return +body._data;
        });
  }

  getEmployees(): Promise<IEmployee[]> {
    return this._http.get(`${API_URL}/api/employees/`, options)
      .toPromise()
      .then((res) => {
        const body = res.json();
        if (typeof body._error === 'string') {
          throw new RestServiceError(body._error);
        }
        return body._data as IEmployee[];
      })
  }

  getEmployee(id: number): Promise<IEmployee> {
    return this._http.get(`${API_URL}/api/employees/${id}`, options)
      .toPromise()
      .then((res) => {
        const body = res.json();
        if (typeof body._error === 'string') {
          throw new RestServiceError(body._error);
        }
        return body._data as IEmployee;
    })
  }

  getEmployeeSkills(id: number): Promise<Array<ISkill>> {
    return this._http.get(`${API_URL}/api/skills/${id}`, options)
      .toPromise()
      .then((res) => {
        const body = res.json();
        if (typeof body._error === 'string') {
          throw new RestServiceError(body._error);
        }
        return body._data as Array<ISkill>;
      })
  }

  getEmployeeProjects(id: number): Promise<Array<IProject>> {
    return this._http.get(`${API_URL}/api/projects/${id}`, options)
      .toPromise()
      .then((res) => {
        const body = res.json();
        if (typeof body._error === 'string') {
          throw new RestServiceError(body._error);
        }
        return body._data as Array<IProject>;
      })
  }

  updateEmployee(employee: IEmployee): Promise<IEmployee> {
    let body = JSON.stringify(employee);
    return this._http.patch(`${API_URL}/api/employees/${employee.id}`, body, options)
      .toPromise()
      .then((res) => {
        const body = res.json();
        return body._data as IEmployee;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  removeEmployee(id: number): Promise<boolean> {
    return this._http.delete(`${API_URL}/api/employees/${id}`, options)
      .toPromise()
      .then((res) => {
          const body = res.json();
          return typeof body._error !== 'string';
      })
  }

  createProject(project: IProject): Promise<number> {
    let body = JSON.stringify(project);
    return this._http.post(`${API_URL}/api/projects/`, body, options)
      .toPromise()
      .then((res) => {
        const body = res.json();
        return +body._data;
      })
  }

  createSkill(skill: ISkill): Promise<number> {
    let body = JSON.stringify(skill);
    return this._http.post(`${API_URL}/api/skills/`, body, options)
      .toPromise()
      .then((res) => {
        const body = res.json();
        return +body._data;
      })
  };

  removeProject(id: number): Promise<boolean> {
    return this._http.delete(`${API_URL}/api/projects/${id}`, options)
      .toPromise()
      .then((res) => {
        const body = res.json();
        return typeof body._error !== 'string';
      });
  }

  removeSkill(id: number): Promise<boolean> {
    return this._http.delete(`${API_URL}/api/skills/${id}`, options)
      .toPromise()
      .then((res) => {
        const body = res.json();
        return typeof body._error !== 'string';
      });
  }
}
