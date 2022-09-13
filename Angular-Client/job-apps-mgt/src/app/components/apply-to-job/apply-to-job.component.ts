import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalDataService } from '../../services/local-data.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-apply-to-job',
  templateUrl: './apply-to-job.component.html',
  styleUrls: ['./apply-to-job.component.css']
})
export class ApplyToJobComponent implements OnInit {

  applyToJobForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  provinceCollection: string[] = [];
  cityCollection: string[] = [];

  // apply-to-job
  submitted = false;
  apiResponse = '';
  responseColor = '';
  errors: string[];

  constructor(
    private router: Router,
    public dataService: DataService, 
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) { }

  ngOnInit() {
    this.applyToJobForm = this.formBuilder.group({
      companyName: [''],
      agencyName: [''],
      webURL: [''],
      contactPersonName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      phoneNumber: ['', [Validators.pattern(this.phoneRegx)]],
      city: ['', Validators.required],
      province: ['', Validators.required],
      appliedOn: ['', Validators.required],
    });

    this.getProvinces();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.applyToJobForm.controls[controlName].hasError(errorName);
  }

  changeProvince(e) {
    // reset city, when province gets changed
    this.cityCollection = [];
    this.applyToJobForm.controls['city'].setValue('');

    if (e.target.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.target.value);
      this.cityCollection = cities;
    }
  }

  applyToJob() {
    this.submitted = true;

    if (!this.applyToJobForm.valid) {    
      return;
    }

    
    var jobAppData = {
      companyName: this.applyToJobForm.value["companyName"],
      agencyName: this.applyToJobForm.value["agencyName"],
      webURL: this.applyToJobForm.value["webURL"],
      contactPersonName: this.applyToJobForm.value["contactPersonName"],
      // contactPersonName: null,
      contactEmail: this.applyToJobForm.value["contactEmail"],
      // contactEmail: null,
      phoneNumber: this.applyToJobForm.value["phoneNumber"],
      city: this.applyToJobForm.value["city"],
      province: this.applyToJobForm.value["province"],
      appliedOn: this.applyToJobForm.value["appliedOn"]
    };

    console.log(jobAppData);

    
    this.dataService.addJobApp(jobAppData)
      .subscribe(
        response => {
          if (response.responseCode == 0) {
            // success    
            this.apiResponse = response.responseMessage;
            this.responseColor = 'green';

            this.applyToJobForm.reset();
            this.errors = [];
            this.submitted = false;

            // selectlist set to default
            // this.applyToJobForm.get("province").patchValue('');
            // this.applyToJobForm.get("city").patchValue('');

            setTimeout(() => {
              this.router.navigate(['/follow-up']);
              this.apiResponse = '';
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

          this.errors = this.localDataService.display400andEx(error, 'Job-Application');
        }
      );
  }

  getProvinces() {
    this.provinceCollection = this.localDataService.getProvinces();
  }
}