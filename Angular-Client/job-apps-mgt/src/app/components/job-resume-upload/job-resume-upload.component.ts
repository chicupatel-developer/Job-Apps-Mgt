import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { LocalDataService } from '../../services/local-data.service';
import { Router } from '@angular/router';
import ResumeUpload from 'src/app/models/resumeUpload';

@Component({
  selector: 'app-job-resume-upload',
  templateUrl: './job-resume-upload.component.html',
  styleUrls: ['./job-resume-upload.component.css']
})
export class JobResumeUploadComponent implements OnInit {

  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;

  // selected job from service
  JobApp: any;
  
  resumeUpload = new ResumeUpload();
  
  apiResponse = '';

  constructor(
    private router: Router,
    public dataService: DataService,
    public localDataService: LocalDataService
  ) { }
  
  ngOnInit() {
    this.getSelectedJobFromService();
  }

  // get selected job from local-data-service
  getSelectedJobFromService() {
    this.JobApp = this.localDataService.getJobApp();
    if (this.JobApp == null) {
      // redirect to follow-up component
      this.router.navigate(['/follow-up']);
    }
    console.log(this.JobApp);
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {

      this.resumeUpload.jobApplicationId = this.JobApp.jobApplicationId;
      this.resumeUpload.resumeFile = this.currentFile;
      
      this.dataService.upload(this.resumeUpload).subscribe(
      // this.dataService.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {

            // file-upload success
            if (event.body.responseCode === 0) {
              this.message = event.body.responseMessage;
              this.apiResponse = "success";
           
              // redirect to follow-up component              
              setTimeout(() => {

                // reset JobApp @ local-data-service
                this.JobApp = null;
                this.localDataService.setJobApp(this.JobApp);

                this.router.navigate(['/follow-up']);
              }, 3000);
            }
            else {
              this.apiResponse = "fail";
            }

            // reset fileName
            this.fileName = 'Select File';
          }
        },
        (err: any) => {
          console.log(err);
          this.apiResponse = "fail";
          this.progress = 0;

          if (err.error != null) {
            if (err.error.responseCode < 0) {
              // Database Error!
              this.message = err.error.responseMessage;
            }
            else {
              this.message = err.error;
            }
          }
          else {
            this.message = 'Could not upload the file !';
          }

          this.currentFile = undefined;

          // reset fileName
          this.fileName = 'Select File';
        });
    }

  }

  // back to follow-up
  backToFollowUp() {
    this.router.navigate(['/follow-up']);
  }

}