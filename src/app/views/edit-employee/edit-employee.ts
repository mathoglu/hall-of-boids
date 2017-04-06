import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {CardService} from '../../../common/services/card-service';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {CardDataService} from "../../../common/services/card-data-service";
import 'rxjs/add/operator/switchMap';
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import {IEmployee} from "../../models/employee-model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {IProject} from "../../models/project-model";
import { ISkill } from "../../models/skill-model";

@Component({
    selector: 'edit-employee-view',
    template: require('./edit-employee.html'),
    styles: [require('./edit-employee.scss')],
})
export class EditEmployeeView implements OnInit, OnDestroy {
  @Input() content;
  employee: IEmployee;
  employeeProjects: Array<IProject>;
  employeeSkills: Array<ISkill>;
  id: number;
  loading: boolean = true;
  paramsSub: Subscription;
  safeEmployeeImage: SafeUrl;
  deletingProject: number = -1;
  deletingSkill: number = -1;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _cardDataService: CardDataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.paramsSub = this._route.params
      .subscribe((params: Params) => {
        if (params['id']) {
          let id = +params['id'];
          return this._cardDataService.getEmployee(id).then(employee => {
            console.log(employee);
            this.employee = employee as IEmployee;
            this.loading = false;
            this.safeEmployeeImage = this.getSafeImage(this.employee.image);
          }).then(() => {
            this._cardDataService.getEmployeeProjects(this.employee.id).then(projects => {
              console.log("Projects loaded");
              console.log(projects);
              this.employeeProjects = projects;
            });
            this._cardDataService.getEmployeeSkills(this.employee.id).then(skills => {
              console.log("Skills loaded");
              console.log(skills);
              this.employeeSkills = skills;
            })
          });
        }
        else {
          // new employee
          this.employee = <IEmployee>{
            image: '',
            first_name: '',
            last_name: '',
            title: '',
            motto: ''
          };
          this.employeeProjects = [];
          this.employeeSkills= [];
          this.loading = false;
        }
      });

  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  private getSafeImage(img) {
    return this.sanitizer.bypassSecurityTrustUrl(img);
  }

  private imageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let fileReader: FileReader = new FileReader();
      let file: File = event.target.files[0];
      fileReader.onloadend = () => {
        this.employee.image = "data:image/png;base64, " + btoa(fileReader.result);
        this.safeEmployeeImage = this.getSafeImage(this.employee.image);
      };
      console.log(fileReader.readAsBinaryString(file));
    }
  }

  addSkill() {
    let newSkill: ISkill = {
      employee_id: this.employee.id,
      name: '',
      rating: 0
    };
    this.employeeSkills.push(newSkill);
  }

  private projectStartDateChange(project, event) {
    if (event.length > 0) {
      if (event.length > 0) {
        let changedProjectIdx = this.employeeProjects
          .findIndex(p => p.id === project.id);
        this.employeeProjects[changedProjectIdx].duration_from = event;
      }
    }
  }

  private projectEndDateChange(project, event) {
    if (event.length > 0) {
      let changedProjectIdx = this.employeeProjects
        .findIndex(p => p.id === project.id);
      this.employeeProjects[changedProjectIdx].duration_to = event;
    }
  }

  addProject() {
    let newProject: IProject = {
      employee_id: this.employee.id,
      client: '',
      description: '',
      duration_from: new Date(),
      duration_to: new Date(),
    };
    this.employeeProjects.push(newProject);
  }

  deleteProject(index) {
    let projectToDelete = this.employeeProjects[index];
    if (projectToDelete.id) {
      let deleted = this._cardDataService.removeProject(projectToDelete.id);
      if (deleted) {
        this.employeeProjects.splice(index, 1);
      }
    }
    else {
      this.employeeProjects.splice(index, 1);
    }
  }

  deleteSkill(index) {
    let skillToDelete = this.employeeSkills[index];
    if (skillToDelete.id) {
      let deleted = this._cardDataService.removeSkill(skillToDelete.id);
      if (deleted) {
        this.employeeSkills.splice(index, 1);
      }
    }
    else {
      this.employeeSkills.splice(index, 1);
    }
  }

  saveNew() {
    this._cardDataService.createEmployee(this.employee).then(id => {
      console.log("Employee created");
      console.log(id);
      this.employee.id = id;
      this.employeeSkills = this.employeeSkills.map(skill => {
        skill.employee_id = id;
        return skill;
      });
      this.employeeProjects = this.employeeProjects.map(project => {
        project.employee_id = id;
        return project;
      });
      Promise.all(
        this.employeeSkills.map(skill => {
          return this._cardDataService.createSkill(skill).then(skillId => {
            let i = this.employeeSkills.findIndex(s => s.name === skill.name);
            this.employeeSkills[i].id = skillId;
          });
        }))
        .then(() => {
          return Promise.all(this.employeeProjects.map(project => {
            return this._cardDataService.createProject(project).then(projectId => {
              let i = this.employeeProjects.findIndex(p => p.client === project.client && p.description === project.description);
              this.employeeProjects[i].id = projectId;
            });
          }));
        })
        .then(()=> {
          this._router.navigate(['/employee', id]);
        })
      });
  }

  save() {
    if (!this.employee.id) {
      this.saveNew();
      return;
    }
    let skillsToAdd = this.employeeSkills.filter(skill => !('id' in skill));
    let projectsToAdd = this.employeeProjects.filter(project => !('id' in project));
    if (skillsToAdd.length > 0) {
      skillsToAdd.map(skill => {
        return this._cardDataService.createSkill(skill).then((skillId) => {
          let i = this.employeeSkills.findIndex(s => s.name === skill.name);
          this.employeeSkills[i].id = skillId;
        });
      })
    }
    if (projectsToAdd.length > 0) {
      projectsToAdd.map(project => {
        return this._cardDataService.createProject(project).then((projectId) => {
          let i = this.employeeProjects.findIndex(p => p.client === project.client && p.description === project.description);
          this.employeeProjects[i].id = projectId;
        });
      })
    }

    this._cardDataService.updateEmployee(this.employee).then((employee) => {
      console.log("Employee updated with: ");
      console.log(employee);
    })
  }

  print() {
    console.log(this.employee);
  }

  goBack() {
    this._location.back();
  }
}
