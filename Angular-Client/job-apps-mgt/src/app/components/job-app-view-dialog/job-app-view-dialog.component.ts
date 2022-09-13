import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LocalDataService } from '../../services/local-data.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

import JobApplication from '../../models/jobApplication';
@Component({
  selector: 'app-job-app-view-dialog',
  templateUrl: './job-app-view-dialog.component.html',
  styleUrls: ['./job-app-view-dialog.component.css']
})
export class JobAppViewDialogComponent implements OnInit {

  jobApplication = new JobApplication();

  constructor(
    private router: Router,
    public dataService: DataService,
    public localDataService: LocalDataService,
    private dialogRef: MatDialogRef<JobAppViewDialogComponent>,
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
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
