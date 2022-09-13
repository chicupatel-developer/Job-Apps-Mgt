import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalDataService } from '../../services/local-data.service';
import { DataService } from 'src/app/services/data.service';

import * as moment from 'moment';

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import JobApplication from '../../models/jobApplication';

// child component
// view
import { JobAppViewDialogComponent } from '../job-app-view-dialog/job-app-view-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  apiResponse = "";
  jobApps = [];
  showSpinner = false;

  filterForm: FormGroup;
  provinceCollection: string[] = [];
  cityCollection: string[] = [];

  // app-status-types enum from api
  appStatusTypes: string[] = [];
  appStatusTypesCollection: any[] = [];
  
  // view job details
  jobApplication = new JobApplication();

  // resume-download
  selectedJob: any;
  // check if file exists or not
  downloadStatus: string;
  downloadClass: string;

  // FollowUpNotes
  // expansion panel
  panelOpenState = false;

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) { }

  ngOnInit(): void {
      this.filterForm = this.formBuilder.group({    
        city: [''],
        province: [''],
        contactPersonName: [''],
        appliedOnStart: [''],
        appliedOnEnd: ['']
      });
    
    this.getAllJobApps();
    this.getAppStatusTypes();

    this.getProvinces();
  }
  
  getAllJobApps() {
    this.showSpinner = true;
    this.dataService.getAllJobApps()
      .subscribe(
        data => {
          this.jobApps = data;
          console.log(this.jobApps);

          // order desc by appliedOn
          // store @ service to filter later on,,, 
          // no need for api call
          // no need to filter @ api
          this.jobApps.sort((x, y) => +new Date(y.appliedOn) - +new Date(x.appliedOn));          
          // this.jobApps.sort((x, y) => +new Date(x.appliedOn) - +new Date(y.appliedOn));
          this.localDataService.setMyJobs(this.jobApps);
          
          this.showSpinner = false;
        },
        error => {
          console.log(error);
          this.showSpinner = false;
          if (error.statusText == "Unknown Error")
            this.apiResponse = "Refresh-Page!";
        });
  }  
  getProvinces() {
    this.provinceCollection = this.localDataService.getProvinces();
  }

  /*
   public enum AppStatusType
   {
       Applied,  --5% --0
       Follow_Up,  --20% --1
       Client_Response,  --40% --2
       Interview_Setup,  --60% --3
       Interview_Done,   --80% --4
       Client_Final_Response --100% --5
   }
 */
  getAppStatusTypes() {
    this.dataService.getAppStatusTypes()
      .subscribe(
        data => {
          console.log(data);
          this.appStatusTypes = data;

          // appStatusTypes = data = ['Applied','FollowUp',,,]
          // appStatusTypesCollection = [{0,'Applied'},{1,'FollowUp'},,,]
          this.appStatusTypesCollection = this.localDataService.getAppStatusTypesCollection(data);          
        },
        error => {
          console.log(error);
          this.showSpinner = false;
          if (error.statusText == "Unknown Error")
            this.apiResponse = "Refresh-Page!";
        });
  }
  displayAppStatusType(appStatus) {
    // ip appStatus=0,1,,,
    if (this.appStatusTypes != null) {

      // returns Applied for ip appStatus==0
      // returns FollowUp for ip appStatus==1
      // ,,,
      return this.appStatusTypesCollection[appStatus].appStatus;
    }
    else {
      return 'N/A';
    }
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
  

  // view
  viewJobDetails(job) {  
    console.log('view job app,,,', job);
    this.dataService.viewJobApp(Number(job.jobApplicationId))
    // this.dataService.viewJobApp('badRequest')
      .subscribe(
        data => {
          console.log(data);
          this.openDialogView(data);
        },
        error => {
          console.log(error);
          this._snackBar.open(error.status + ' : ' + error.error, '', {
            duration: 3000
          });      
        });
  }
  // open dialog
  // view
  openDialogView(job) {
    console.log(job);
    const dialogRef = this.dialog.open(JobAppViewDialogComponent, {
      width: '50%',
      minHeight: '85%',
      height: '85%',
      data: {
        jobApplicationId: job.jobApplicationId,
        companyName: job.companyName,
        agencyName: job.agencyName,
        webURL: job.webURL,
        contactPersonName: job.contactPersonName,
        contactEmail: job.contactEmail,
        phoneNumber: job.phoneNumber,
        city: job.city,
        province: job.province,
        appliedOn: job.appliedOn,
        appStatus: job.appStatus,
        appStatusDisplay: this.displayAppStatusType(job.appStatus),
        followUpNotes: job.followUpNotes
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
    
      }
    });
  }

  // edit
  editJobDetails(job) {  
    console.log('edit job app,,,',job);
  }
  openDialog(job) {
    console.log('before edit job app,,,',job);
  }

  // delete 
  deleteJobDetails(job) {
    console.log('deleting job app,,,',job);
  }

  // resume-upload
  resumeUpload(job) {
    console.log('upload resume job app,,,',job);
  }

  // resume-download
  resumeDownload(job) {
    console.log('download resume job app,,,',job);
  }

  // tracking 
  trackAppStatus(job) {
     console.log('tracking job app,,,',job);
  }

}
