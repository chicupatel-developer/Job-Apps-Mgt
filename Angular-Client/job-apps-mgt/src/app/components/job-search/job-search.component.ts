import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataService } from '../../services/local-data.service';
import * as moment from 'moment';


@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {

  @Input() jobApps = [];
  @Output() dataFilterDone: EventEmitter<any[]> =   new EventEmitter();

  filterForm: FormGroup;
  provinceCollection: string[] = [];
  cityCollection: string[] = [];
  
  constructor(private formBuilder: FormBuilder,  public localDataService: LocalDataService) { }

  ngOnInit(): void {
    console.log('child comp,,, ', this.jobApps);
    
    this.filterForm = this.formBuilder.group({    
        city: [''],
        province: [''],
        contactPersonName: [''],
        appliedOnStart: [''],
        appliedOnEnd: ['']
    });
    
    this.getProvinces();
  }

  getProvinces() {
    this.provinceCollection = this.localDataService.getProvinces();
  }
  changeProvince(e) {
    // reset city, when province gets changed
    this.cityCollection = [];
    this.filterForm.controls['city'].setValue('');

    if (e.target.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.target.value);
      this.cityCollection = cities;
    }
  }
  filterNow() {   
    var filterAppliedOnStart = this.filterForm.value["appliedOnStart"];
    var filterAppliedOnEnd = this.filterForm.value["appliedOnEnd"];

    var filterProvince = this.filterForm.value["province"];
    var filterCity = this.filterForm.value["city"];
    var filterContactPersonName = this.filterForm.value["contactPersonName"];
    
    // var jobApps_ = this.jobApps;
    var jobApps_ = this.localDataService.getMyJobs();

    if (this.filterForm.value["province"] != '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.province === filterProvince;
      });
    }
    if (this.filterForm.value["city"] != '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.city === filterCity;
      });
    }
    if (this.filterForm.value["contactPersonName"] != '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.contactPersonName === filterContactPersonName;
      });
    }   
    if (this.filterForm.value["appliedOnStart"] != '' && this.filterForm.value["appliedOnEnd"] ) {
      if (filterAppliedOnStart != null && filterAppliedOnEnd != null) {
        jobApps_ = jobApps_.filter(function (job) {
          return moment(job.appliedOn).format("YYYY-MM-DD") <= moment(filterAppliedOnEnd).format("YYYY-MM-DD")
            && moment(job.appliedOn).format("YYYY-MM-DD") >= moment(filterAppliedOnStart).format("YYYY-MM-DD");
        });
      }
    }
    // return jobApps_ to parent-component
    console.log('after filter in child comp,,, ', jobApps_);
    
    this.dataFilterDone.emit(jobApps_);
  }

}
