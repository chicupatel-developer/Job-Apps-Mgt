import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-edit-work-experience',
  templateUrl: './edit-work-experience.component.html',
  styleUrls: ['./edit-work-experience.component.css']
})
export class EditWorkExperienceComponent implements OnInit {

  @Input() pageHeader: string | undefined;
  @Input() editWoExp: any | undefined;

  @Output() editDoneChanged: EventEmitter<boolean> = new EventEmitter();

  workExpForm: FormGroup;

  provinceCollection: string[] = [];
  cityCollection: string[] = [];

  submitted = false;

  // calculate work experience duration
  startDate = '';
  endDate = '';
  duration = 0;

  selectedProvince = '';
  selectedCity = '';

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

  ngOnChanges() {
    this.setFormControls()
  }

  ngOnInit(): void {
    this.setFormControls();
    this.getProvinces();
  }

  setFormControls() {

    this.workExpForm.setValue({
      employerName: this.editWoExp.employerName,
      province: this.editWoExp.province,
      city: this.editWoExp.city,
      startDate: this.editWoExp.startDate,
      endDate: this.editWoExp.endDate,
      jobDetails: this.editWoExp.jobDetails
    });

    this.duration = this.editWoExp.duration;

    this.selectedProvince = this.editWoExp.province;
    var cities = this.localDataService.getCities(this.selectedProvince);
    this.cityCollection = cities;
    this.selectedCity = this.editWoExp.city;
  }

  changeProvince(e) {
    // reset city, when province gets changed
    this.cityCollection = [];
    this.workExpForm.controls['city'].setValue('');

    if (e.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.value);
      this.cityCollection = cities;
    }
  }

  editWorkExperience() {
    this.submitted = true;

    if (!this.workExpForm.valid) {
      console.log('Invalid Form!');
      return;
    }
    
    var currentEditingEmployerName = this.workExpForm.value["employerName"];

    var allJobDetails = this.workExpForm.value["jobDetails"].substring(0, this.workExpForm.value["jobDetails"].lastIndexOf("\n\n")).split('\n\n');
  
    var workExpEdited = {
      employerName: currentEditingEmployerName,
      city: this.workExpForm.value["city"],
      province: this.workExpForm.value["province"],
      startDate: this.workExpForm.value["startDate"],
      endDate: this.workExpForm.value["endDate"],
      jobDetails: allJobDetails,
      duration: this.duration
    };
    if (this.workExpForm.value["endDate"] === '' || this.workExpForm.value["endDate"] === undefined || this.workExpForm.value["endDate"] === null) {      
      workExpEdited.endDate = '';
    }
      
    // reset work-experience form  
    this.workExpForm.reset();
    this.duration = 0;

    // save to local-data-service
    var otherWoExp = this.localDataService.getWorkExperience().filter(function (woExp) {
      return woExp.employerName != currentEditingEmployerName;
    });
    otherWoExp.push(workExpEdited);
    this.localDataService.setWorkExperience(otherWoExp);
    
    this.saved = true;
    setTimeout(() => {
      this.saved = false;
      // notify parent component that edit is done
      this.editDoneChanged.emit(true);
    }, 3000);  
  }
  cancelEditWorkExperience() {
    // notify parent component that edit is done
    this.editDoneChanged.emit(true);
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