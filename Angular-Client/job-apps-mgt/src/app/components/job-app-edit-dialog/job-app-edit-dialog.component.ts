import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LocalDataService } from '../../services/local-data.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import JobApplication from '../../models/jobApplication';

@Component({
  selector: 'app-job-app-edit-dialog',
  templateUrl: './job-app-edit-dialog.component.html',
  styleUrls: ['./job-app-edit-dialog.component.css']
})
export class JobAppEditDialogComponent implements OnInit {
 
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  form: FormGroup;
  submitted = false;
  apiResponse = '';
  responseColor = '';
  errors: string[];

  provinceCollection: string[] = [];
  cityCollection: string[] = [];
  
  jobApplication = new JobApplication();
  selectedProvince = '';
  selectedCity = '';

  appStatusTypesName: string[] = [];
  appStatusTypesCollection: any[] = [];
  // holds either 0 or 1 or ,,,
  selectedAppStatus = '';
  // holds either Applied or FollowUp or ,,,
  selectedAppStatusDisplay = '';

  // before edit appStatus
  beforeEditAppStatus = '';
  showEditAppStatusDatePicker = false;

  constructor(
    private router: Router,
    public dataService: DataService,
    public localDataService: LocalDataService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobAppEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) {
      jobApplicationId,
      companyName,
      agencyName,
      webURL,
      contactPersonName,
      contactEmail,
      phoneNumber,
      city,
      province,
      appliedOn,
      appStatus,
      appStatusDisplay,
      followUpNotes
    }: JobApplication) {

    this.form = fb.group({
      companyName: [''],
      agencyName: [''],
      webURL: [''],
      contactPersonName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      phoneNumber: ['', [Validators.pattern(this.phoneRegx)]],
      city: ['', Validators.required],
      province: ['', Validators.required],
      appliedOn: ['', Validators.required],
      // appStatus: ['', Validators.required],
      appStatusDisplay: ['', Validators.required],
      followUpNotes: [''],
      appStatusChangedOn: ['', Validators.required]
    });

    this.jobApplication.jobApplicationId = jobApplicationId;
    this.jobApplication.companyName = companyName;
    this.jobApplication.agencyName = agencyName;
    this.jobApplication.webURL = webURL;
    this.jobApplication.contactPersonName = contactPersonName;
    this.jobApplication.contactEmail = contactEmail;
    this.jobApplication.phoneNumber = phoneNumber;
    this.jobApplication.city = city;
    this.jobApplication.province = province;
    this.jobApplication.appliedOn = appliedOn;
    this.jobApplication.appStatus = appStatus;
    this.jobApplication.appStatusDisplay = appStatusDisplay;
    this.jobApplication.followUpNotes = followUpNotes;

    this.selectedProvince = province;
    var cities = this.localDataService.getCities(province);
    this.cityCollection = cities;
    this.selectedCity = city;
    this.selectedAppStatus = appStatus;
    this.selectedAppStatusDisplay = appStatusDisplay;

    this.beforeEditAppStatus = appStatusDisplay;
  }

  ngOnInit(): void {  

    this.form.setValue({
      companyName: this.jobApplication.companyName,
      agencyName: this.jobApplication.agencyName,
      webURL: this.jobApplication.webURL,
      contactPersonName: this.jobApplication.contactPersonName,
      contactEmail: this.jobApplication.contactEmail,
      phoneNumber: this.jobApplication.phoneNumber,
      city: this.jobApplication.city,
      province: this.jobApplication.province,
      appliedOn: this.jobApplication.appliedOn,
      // appStatus: this.jobApplication.appStatus,
      appStatusDisplay: this.jobApplication.appStatusDisplay,
      followUpNotes: this.jobApplication.followUpNotes,
      appStatusChangedOn: new Date()
    });
   
    this.getAppStatusTypes();

    this.getProvinces();
  }

  onAppStatusChange(event) {
    if (event.value === this.beforeEditAppStatus) {
      this.showEditAppStatusDatePicker = false;
    }
    else {
      this.showEditAppStatusDatePicker = true;
    }
  }

  getAppStatusTypes() {
    this.dataService.getAppStatusTypes()
      .subscribe(
        data => {
          console.log(data);
          this.appStatusTypesName = data;

          // appStatusTypesName = data = ['Applied','FollowUp',,,]
          // appStatusTypesCollection = [{0,'Applied'},{1,'FollowUp'},,,]
          this.appStatusTypesCollection = this.localDataService.getAppStatusTypesCollection(data);
        },
        error => {
          console.log(error);
        });
  }  
  // convert string into int
  // returns 0 for Applied
  // returns 1 for FollowUp
  // ,,,
  convertAppStatusType(appStatusType) {
    var filterByAppStatusTypeName = this.appStatusTypesCollection.filter(xx => xx.appStatus == appStatusType);
    if (filterByAppStatusTypeName != null && filterByAppStatusTypeName.length>0) {
      return filterByAppStatusTypeName[0].indexValue;
    }
    else {
      return -1;
    }
  }
  // convert int into string
  // returns Applied for 0
  // returns FollowUp for 1
  // ,,,
  /*
  convertAppStatusTypeToFormControl(appStatusType) {
    var filterByAppStatusType = this.appStatusTypesCollection.filter(xx => xx.indexValue == appStatusType);
    if (filterByAppStatusType != null) {
      return filterByAppStatusType[0].appStatus;
    }
    else {
      return -1;
    }
  }
  */
  
  changeProvince(e) {
    // reset city, when province gets changed
    this.cityCollection = [];
    this.form.controls['city'].setValue('');

    if (e.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.value);
      this.cityCollection = cities;
    }
  }

  save() {  
    this.submitted = true;       
    
    // prepare object for api call
    var jobApplicationId = this.jobApplication.jobApplicationId;
    this.jobApplication = this.form.value;
    this.jobApplication.jobApplicationId = jobApplicationId;
    this.jobApplication.appStatus = this.convertAppStatusType(this.selectedAppStatusDisplay);

    console.log(this.jobApplication);

    var jobApplicationEditVM = {};
    
    // complete form validation
    if (!this.form.valid) {
      console.log('Invalid Form!');
      // model state validation
      // return;
      return;
    }

    if (this.jobApplication.appStatusDisplay != this.beforeEditAppStatus) {          
      jobApplicationEditVM = {
        jobApplication: this.jobApplication,
        appStatusChanged: true,
        appStatusChangedOn: this.form.value["appStatusChangedOn"]
      }      
    }
    else {
      // patch for appStatusChangedOn, then
      // complete form validation
      this.form.get("appStatusChangedOn").patchValue(new Date());

      jobApplicationEditVM = {
        jobApplication: this.jobApplication,
        appStatusChanged: false,
        appStatusChangedOn: new Date()
      }
    }
    console.log(jobApplicationEditVM);

    // api call
    // this.dataService.editJobApp(this.jobApplication)
    this.dataService.editJobApp(jobApplicationEditVM)
      .subscribe(
        response => {
          if (response.responseCode == 0) {
            // success    
            this.apiResponse = response.responseMessage;
            this.responseColor = 'green';

            this.form.reset();
            this.errors = [];
            this.submitted = false;

            setTimeout(() => {
              this.router.navigate(['/follow-up']);
              this.apiResponse = '';

              // close dialog
              // and return just edited jobApplication object to caller component
              this.dialogRef.close(this.jobApplication);
            }, 3000);
          }
          else {
            // server error
            this.apiResponse = response.responseCode + ' : ' + response.responseMessage;
            this.responseColor = 'red';

            this.errors = [];
          }
        },
        error => {
          this.apiResponse = '';
          this.responseColor = 'red';
          this.errors = [];

          if (error.status === 400) {
            console.log(error);
            this.apiResponse = "Bad Request!";
          }
          this.errors = this.localDataService.display400andEx(error, 'Edit-Job-App');
        }
      ); 
  }

  close() {
    this.dialogRef.close();
  }

  getProvinces() {
    this.provinceCollection = this.localDataService.getProvinces();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
}