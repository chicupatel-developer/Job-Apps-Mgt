import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LocalDataService } from '../../services/local-data.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-app-status-track-dialog',
  templateUrl: './app-status-track-dialog.component.html',
  styleUrls: ['./app-status-track-dialog.component.css']
})
export class AppStatusTrackDialogComponent implements OnInit {


  appStatusTrackingData = [];

  /*  
    public enum AppStatusType
    {
        Applied,  --5% --0
        Follow_Up,  --20% --1
        Client_Response,  --40% --2
        Interview_Setup,  --60% --3
        Interview_Done,   --80% --4
        Client_Final_Response --100% --5
        Closed --0% --6
    }
  */

  constructor(
    private router: Router,
    public dataService: DataService,
    public localDataService: LocalDataService,
    private dialogRef: MatDialogRef<AppStatusTrackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.appStatusTrackingData = data;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}