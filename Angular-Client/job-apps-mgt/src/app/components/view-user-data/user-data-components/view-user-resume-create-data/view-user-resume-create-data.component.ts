import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-user-resume-create-data',
  templateUrl: './view-user-resume-create-data.component.html',
  styleUrls: ['./view-user-resume-create-data.component.css']
})
export class ViewUserResumeCreateDataComponent implements OnInit {
  apiResponse = '';

  displayedColumns = ['userResumeCreateId', 'firstName', 'lastName', 'resumeCreatedAt', 'userIPAddress'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  doFilter = (event) => {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  getUserData() {
    this.dataService.getUserResumeCreateData()
      .subscribe(
        data => {
          if (data == null) {
            this.dataSource.data = [];
            this.apiResponse = 'User-Resume-Create Data Not Found!';
          }
          else if (data.length == 0) {
            this.dataSource.data = [];
            this.apiResponse = 'User-Resume-Create Data is Empty!';
          }
          else {
            data.forEach((element) => {
              var ipAddress = element.userIPAddress;
              var ipAddressArray = ipAddress.split(',');
              element.userIPAddress = ipAddressArray;
            });
            this.dataSource.data = data as any[];
          }
        },
        error => {
          console.log(error);
          this.apiResponse = error.error;
        });
  }
}