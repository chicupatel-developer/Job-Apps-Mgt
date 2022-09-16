import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-user-resume-email-data',
  templateUrl: './view-user-resume-email-data.component.html',
  styleUrls: ['./view-user-resume-email-data.component.css']
})
export class ViewUserResumeEmailDataComponent implements OnInit {
  apiResponse = '';

  displayedColumns = ['userResumeEmailId', 'firstName', 'lastName', 'resumeEmailedAt', 'userEmail'];
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
    this.dataService.getUserResumeEmailData()
      .subscribe(
        data => {
          if (data == null) {
            this.dataSource.data = [];
            this.apiResponse = 'User-Resume-Email Data Not Found!';
          }
          else if (data.length == 0) {
            this.dataSource.data = [];
            this.apiResponse = 'User-Resume-Email Data is Empty!';
          }
          else {
            this.dataSource.data = data as any[];
          }
        },
        error => {
          console.log(error);
          this.apiResponse = error.error;
        });
  }
}