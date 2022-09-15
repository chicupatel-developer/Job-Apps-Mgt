import { Component, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LocalDataService } from 'src/app/services/local-data.service';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

@Component({
  selector: 'app-save-and-view-resume',
  templateUrl: './save-and-view-resume.component.html',
  styleUrls: ['./save-and-view-resume.component.css']
})
export class SaveAndViewResumeComponent {

  @Input() pageHeader: string | undefined;

  apiResponse = '';
  successResponse = '';

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {    
  }

  checkResumeData() {
    var personalInfo = this.localDataService.getPersonalInfo();
    var skills = this.localDataService.getSkills();
    var workExps = this.localDataService.getWorkExperience();
    var educations = this.localDataService.getEducation();

    var dataValid = false;
    var myResume = {};
   
    if (personalInfo == null || skills == null || workExps == null || educations == null) {
      console.log('Resume Data Not Found!');
      dataValid = false;
    }
    else {
      
      // format work-experience's startDate/endDate
      var woExps = workExps;
      woExps.forEach((woe) => {
        var startDate_ = monthNames[new Date(woe.startDate).getMonth()] + ', ' + new Date(woe.startDate).getFullYear();
        woe.startDate = startDate_;

        if (woe.endDate === '') {
          woe.endDate = 'Till - Date';
        }
        else {
          var endDate_ = monthNames[new Date(woe.endDate).getMonth()] + ', ' + new Date(woe.endDate).getFullYear();
          woe.endDate = endDate_;
        }
      });
      // console.log(woExps);
    
    
      // format education's startDate/endDate
      var edus = educations;
      edus.forEach((edu) => {
        var startDate_ = monthNames[new Date(edu.startDate).getMonth()] + ', ' + new Date(edu.startDate).getFullYear();
        edu.startDate = startDate_;

        if (edu.endDate === '') {
          edu.endDate = 'Till - Date';
        }
        else {
          var endDate_ = monthNames[new Date(edu.endDate).getMonth()] + ', ' + new Date(edu.endDate).getFullYear();
          edu.endDate = endDate_;
        }
      });
      
      myResume = {
        personalInfo: personalInfo,
        // personalInfo: null,
        skills: skills,
        workExperience: woExps,
        education: edus
      };      
      console.log(myResume);
      dataValid = true;      
    }
    

    if (dataValid)
      return myResume;
    else
      return null;

  }
  
  createAndDownloadResume() {
    var myResume = this.checkResumeData();
    if (myResume != null) {
      // api call      
      this.dataService.createAndDownloadResume(myResume)
        .subscribe(
          blob => {
            console.log(blob);

            // const myFile = new Blob([blob], { type: 'text/csv' });            
            const myFile = new Blob([blob], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(myFile);
            window.open(url);
            
            // redirect to resume-creator component, so 
            // all service variables get reset
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
          error => {
            if (error.status === 400) {
              this.apiResponse = 'Bad Request!';            
            }
            else if (error.status === 500) {   
              this.apiResponse = 'Server Error!';
            }
            else {
              console.log(error);
              this.apiResponse = 'Error!';
            }
            setTimeout(() => {
              this.apiResponse = '';
            }, 3000);
          }
        );
    }
    else {
      this.apiResponse = 'Resume Data Not Found!';
      setTimeout(() => {
        this.apiResponse = '';
      }, 3000);
    }
  }

  createAndEmailResume() {
    var myResume = this.checkResumeData();
    if (myResume != null) {
      // api call
      this.dataService.createAndEmailResume(myResume)
        .subscribe(
          json => {
            console.log(json);
            this.successResponse = json;
            setTimeout(() => {
              this.successResponse = '';
            }, 3000);
          },
          error => {
            console.log(error);            
            if (error.status === 400) {
              this.apiResponse = error.error;
            }
            else if (error.status === 500) {
              this.apiResponse = error.error;
            }
            else {
              this.apiResponse = 'Error!';
            }
            setTimeout(() => {
              this.apiResponse = '';
            }, 3000);
          }
        );
    }
    else {
      this.apiResponse = 'Resume Data Not Found!';
      setTimeout(() => {
        this.apiResponse = '';
      }, 3000);
    }
  }
}