import { Component, Input  } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from 'src/app/services/local-data.service';
import PersonalInfo from 'src/app/models/personalInfo';

@Component({
  selector: 'app-personal-info-create',
  templateUrl: './personal-info-create.component.html',
  styleUrls: ['./personal-info-create.component.css']
})
export class PersonalInfoCreateComponent {

  @Input() pageHeader: string | undefined;

  personalInfoForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  provinceCollection: string[] = [];
  cityCollection: string[] = [];

  submitted = false;
  personalInfo = new PersonalInfo();

  saved = false;

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      phoneNumber: ['', [Validators.pattern(this.phoneRegx)]],
      city: ['', Validators.required],
      province: ['', Validators.required]
    });
 
    this.getProvinces();
  }

  changeProvince(e) {
    this.cityCollection = [];
    this.personalInfoForm.controls['city'].setValue('');

    if (e.target.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.target.value);
      this.cityCollection = cities;
    }
  }

  // save personal-info to local-data-service
  savePersonalInfo() {
    this.submitted = true;

    if (!this.personalInfoForm.valid) {
      return;
    }

    // prepare personal info data
    var personalInfoData = {
      firstName: this.personalInfoForm.value["firstName"],
      lastName: this.personalInfoForm.value["lastName"],
      emailAddress: this.personalInfoForm.value["emailAddress"],
      phoneNumber: this.personalInfoForm.value["phoneNumber"],
      city: this.personalInfoForm.value["city"],
      province: this.personalInfoForm.value["province"]
    };
    // console.log(personalInfoData);

    // save to local-data-service
    this.personalInfo = personalInfoData;
    this.localDataService.setPersonalInfo(this.personalInfo);

    console.log(this.localDataService.getPersonalInfo());

  
    this.saved = true;
    setTimeout(() => {
      this.saved = false;
    }, 3000);

  }

  getProvinces() {
    this.provinceCollection = this.localDataService.getProvinces();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.personalInfoForm.controls[controlName].hasError(errorName);
  }
}