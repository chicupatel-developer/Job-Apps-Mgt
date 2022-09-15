import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataService } from 'src/app/services/local-data.service';
import WorkExperience from 'src/app/models/workExperience';

@Component({
  selector: 'app-add-work-experience',
  templateUrl: './add-work-experience.component.html',
  styleUrls: ['./add-work-experience.component.css']
})
export class AddWorkExperienceComponent implements OnInit {

  @Input() pageHeader: string | undefined;
  @Output() employerListChanged: EventEmitter<string> = new EventEmitter();
  
  workExpForm: FormGroup;

  provinceCollection: string[] = [];
  cityCollection: string[] = [];

  submitted = false;
  workExp = new WorkExperience();
  workExps: any[] = [];
  jobDetailsForWE: string[] = [];

  // calculate work experience duration
  startDate = '';
  endDate = '';
  duration = 0;

  saved = false;

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
    this.workExpForm = this.formBuilder.group({
      employerName: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      jobDetails: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProvinces();
  }

  changeProvince(e) {
    this.cityCollection = [];
    this.workExpForm.controls['city'].setValue('');

    if (e.target.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.target.value);
      this.cityCollection = cities;
    }
  }

  prepareDataForWorkExperience() {

    this.submitted = true;

    if (!this.workExpForm.valid) {
      console.log('Invalid Form!');
      return;
    }

    // prepare work experience data
    var workExp = {
      employerName: this.workExpForm.value["employerName"],
      city: this.workExpForm.value["city"],
      province: this.workExpForm.value["province"],
      startDate: this.workExpForm.value["startDate"],
      endDate: this.workExpForm.value["endDate"],
      jobDetails: this.jobDetailsForWE,
      duration: this.duration
    };

    if (this.workExpForm.value["endDate"] === '' || this.workExpForm.value["endDate"] === undefined || this.workExpForm.value["endDate"] ===null) {    
      workExp.endDate = '';
    }
      
    // reset work-experience form  
    this.workExpForm.reset();

    // save to local-data-service
    var myWoExps = this.localDataService.getWorkExperience();
    this.workExps = Object.assign([], myWoExps);
    this.workExps.push(workExp);
    this.localDataService.setWorkExperience(this.workExps);

    // reset this.jobDetailsForWE[]
    this.jobDetailsForWE = [];

    // reset duration
    this.duration = 0;

    // notify parent component's employerList
    this.employerListChanged.emit(workExp.employerName);

    this.saved = true;
    setTimeout(() => {
      this.saved = false;
    }, 3000);
  }

  saveAndAddMoreWorkExperience() {
    this.prepareDataForWorkExperience();
  }

  // save all work-experiences and move to next step in resume-creator
  saveWorkExperience() {
    this.prepareDataForWorkExperience();

    if (this.localDataService.getWorkExperience() != undefined && this.localDataService.getWorkExperience().length > 0) {
      // console.log(this.localDataService.getWorkExperience());

      // move to next step
    }
    else {
      console.log('You Have ZERO Work - Experience !');
    }
  }

  // add job-Details to work-experience
  addJobDetails() {
    if (!(this.workExpForm.value["jobDetails"] == '' || this.workExpForm.value["jobDetails"] == 'Add Job Details Here!')) {
      if (this.workExpForm.value["jobDetails"] != null) {
        this.jobDetailsForWE.push((this.workExpForm.value["jobDetails"]).trim());
        this.workExpForm.controls['jobDetails'].setValue('Add Job Details Here!');
      }
    }
  }

  // get duration from endDate and startDate  
  onBlurEvent_EndDate(event) {
    if (this.workExpForm.value["startDate"] != null) {
      this.endDate = event.target.value;
      this.startDate = this.workExpForm.value["startDate"];
      console.log(this.startDate + ' --> ' + this.endDate);

      var Difference_In_Days = 0;
      if (this.endDate === '') {
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date();
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
        console.log('blur if ... duration : ' + Difference_In_Days);
      }
      else {
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date(this.endDate);
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
        console.log('blur else ... duration : ' + Difference_In_Days);
      }
      this.duration = Difference_In_Days;
    }
    else
      this.duration = 0;
  }
  changeEvent_EndDate(event) {
    if (this.workExpForm.value["startDate"] != null) {
      this.endDate = event.target.value;
      this.startDate = this.workExpForm.value["startDate"];
      console.log(this.startDate + ' --> ' + this.endDate);

      var Difference_In_Days = 0;
      if (this.endDate === null) {
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date();
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
        console.log('change if ... duration : ' + Difference_In_Days);
      }
      else {
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date(this.endDate);
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
        console.log('change else ... duration : ' + Difference_In_Days);
      }
      this.duration = Difference_In_Days;
    }
    else
      this.duration = 0;
  }
  changeEvent_StartDate(event) {
    if (event.target.value != null) {
      this.endDate = this.workExpForm.value["endDate"];
      this.startDate = event.target.value;
      console.log(this.startDate + ' --> ' + this.endDate);

      var Difference_In_Days = 0;
      if (this.endDate === '') {
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date();
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
        console.log('change if ...startDate... duration : ' + Difference_In_Days);
      }
      else {
        if (this.endDate === null) {
          var eventStartTime = new Date(this.startDate);
          var eventEndTime = new Date();
          var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
          Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
          console.log('change else-if ...startDate... duration : ' + Difference_In_Days);
        }
        else {
          var eventStartTime = new Date(this.startDate);
          var eventEndTime = new Date(this.endDate);
          var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
          Difference_In_Days = Math.floor(duration / (1000 * 3600 * 24));
          console.log('change else-else ...startDate... duration : ' + Difference_In_Days);
        }
      }
      this.duration = Difference_In_Days;
    }
    else
      this.duration = 0;
  }

  getProvinces() {
    this.provinceCollection = this.localDataService.getProvinces();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.workExpForm.controls[controlName].hasError(errorName);
  }
}