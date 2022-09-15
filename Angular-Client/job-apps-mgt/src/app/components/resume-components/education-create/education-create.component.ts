import { Component, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-education-create',
  templateUrl: './education-create.component.html',
  styleUrls: ['./education-create.component.css']
})
export class EducationCreateComponent {

  @Input() pageHeader: string | undefined;

  editEdu: any;

  showAdd = true;
  showEdit = false;

  // store degree's name for future edit/remove of education
  degreeList: string[] = [];

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {

  }

  ngOnInit(): void {
  }

  // notification coming from child - add-education component
  degreeListChangedHandler(degreeName: string) {
    this.degreeList.push(degreeName);
    console.log(this.degreeList);
  }

  // notification coming from child - edit-education component
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

  editEducation(editingDegreeName) {

    this.showEdit = true;
    this.showAdd = false;

    var editingEducation = this.localDataService.getEducation().filter(function (edu) {
      return edu.degreeName === editingDegreeName;
    });

    var myEdu = {
      universityName: editingEducation[0].universityName,
      country: editingEducation[0].country,
      startDate: editingEducation[0].startDate,
      endDate: editingEducation[0].endDate,
      degreeName: editingEducation[0].degreeName,
      major: editingEducation[0].major
    };

    // send this editEducation to edit-education child component
    this.editEdu = myEdu;
  }

  removeEducation(removingDegreeName) {
    this.showEdit = false;
    this.showAdd = true;

    var afterRemoveEducation = this.localDataService.getEducation().filter(function (edu) {
      return edu.degreeName != removingDegreeName;
    });
    this.localDataService.setEducation(afterRemoveEducation);

    var afterRemoveDegreeList = this.degreeList.filter(function (el) { return el != removingDegreeName; });
    this.degreeList = afterRemoveDegreeList;
  }
}