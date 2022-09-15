import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from 'src/app/services/local-data.service';


@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {

  @Input() pageHeader: string | undefined;
  @Output() degreeListChanged: EventEmitter<string> = new EventEmitter();

  educationForm: FormGroup;

  countryCollection: string[] = [];

  submitted = false;
  educations: any[] = [];

  startDate = '';
  endDate = '';

  saved = false;

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
    this.educationForm = this.formBuilder.group({
      universityName: ['', Validators.required],
      country: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      degreeName: ['', Validators.required],
      major: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCountries();
  }

  prepareDataForEducation() {
    this.submitted = true;

    if (!this.educationForm.valid) {
      console.log('Invalid Form!');
      return;
    }

    // prepare education data
    var education = {
      universityName: this.educationForm.value["universityName"],
      country: this.educationForm.value["country"],
      startDate: this.educationForm.value["startDate"],
      endDate: this.educationForm.value["endDate"],
      degreeName: this.educationForm.value["degreeName"],
      major: this.educationForm.value["major"]
    };

    if (this.educationForm.value["endDate"] === '' || this.educationForm.value["endDate"] === undefined || this.educationForm.value["endDate"] === null) {
      education.endDate = '';
    }

    // reset education form  
    this.educationForm.reset();

    // save to local-data-service
    var myEducations = this.localDataService.getEducation();
    this.educations = Object.assign([], myEducations);
    this.educations.push(education);
    this.localDataService.setEducation(this.educations);

    // notify parent component's degreeList
    this.degreeListChanged.emit(education.degreeName);

    this.saved = true;
    setTimeout(() => {
      this.saved = false;
    }, 3000);
  }

  saveAndAddMoreEducation() {
    this.prepareDataForEducation();
  }

  // save all educations and move to next step in resume-creator
  saveEducation() {
    this.prepareDataForEducation();

    if (this.localDataService.getEducation() != undefined && this.localDataService.getEducation().length > 0) {    
      // move to next step
    }
    else {
      console.log('You Have ZERO Education !');
    }
  }

  getCountries() {
    this.countryCollection = this.localDataService.getCountries();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.educationForm.controls[controlName].hasError(errorName);
  }
}