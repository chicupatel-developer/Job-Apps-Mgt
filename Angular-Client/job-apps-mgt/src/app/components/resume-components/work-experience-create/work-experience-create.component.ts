import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-work-experience-create',
  templateUrl: './work-experience-create.component.html',
  styleUrls: ['./work-experience-create.component.css']
})

export class WorkExperienceCreateComponent implements OnInit {

  @Input() pageHeader: string | undefined;
  

  editWoExp: any;

  showAdd = true;
  showEdit = false;

  // store employer's name for future edit of work-experience
  employerList: string[] = [];

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
  
  }
 
  ngOnInit(): void {
  }

  // notification coming from child - add-work-experience component
  employerListChangedHandler(employerName: string) {    
    this.employerList.push(employerName);
    console.log(this.employerList);
  }

  // notification coming from child - edit-work-experience component
  editDoneChangedHandler(editDone: boolean) {
    if (editDone) {
      this.showAdd = true;
      this.showEdit = false;
    }
    else {
      this.showAdd = false;
      this.showEdit = true;
    }
  }

  editWorkExperience(editingEmployerName) {
    
    this.showEdit = true;
    this.showAdd = false;

    var editingWoExp = this.localDataService.getWorkExperience().filter(function (woExp) {
      return woExp.employerName === editingEmployerName;
    });

    let jobDetailsForEditingWoExp = '';
    for (let entry of editingWoExp[0].jobDetails) {
      jobDetailsForEditingWoExp = jobDetailsForEditingWoExp + entry + '\n\n';
    }

    var myWoExp = {
      employerName: editingWoExp[0].employerName,
      province: editingWoExp[0].province,
      city: editingWoExp[0].city,
      startDate: editingWoExp[0].startDate,
      endDate: editingWoExp[0].endDate,
      jobDetails: jobDetailsForEditingWoExp,
      duration: editingWoExp[0].duration
    };
    
    // send this editingWoExp to edit-work-experience child component
    this.editWoExp = myWoExp;
  }

  removeWorkExperience(removingEmployerName) {
    this.showEdit = false;
    this.showAdd = true;

    var afterRemoveWorkExperience = this.localDataService.getWorkExperience().filter(function (emp) {
      return emp.employerName != removingEmployerName;
    });
    this.localDataService.setWorkExperience(afterRemoveWorkExperience);

    var afterRemoveEmployerList = this.employerList.filter(function (el) { return el != removingEmployerName; });
    this.employerList = afterRemoveEmployerList;
  }
}