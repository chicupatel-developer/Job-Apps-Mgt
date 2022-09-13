import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalDataService } from '../services/local-data.service';
import ResumeUpload from '../models/resumeUpload';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public API = 'https://localhost:44318';
  public JobApplication_API = `${this.API}/api/JobApplication`;
  public JobResume_API = `${this.API}/api/JobResume`;
  public ResumeCreator_API = `${this.API}/api/ResumeCreator`;
  public UW_API = `${this.API}/api/UW`;

  constructor(private http: HttpClient, public localDataService: LocalDataService) { }

  // apply-to-job
  // add jobApplication
  addJobApp(jobAppData): Observable<any> {
    return this.http.post(this.JobApplication_API + '/addJobApplication', jobAppData)
  }

  // follow-up
  // get all jobApplications
  getAllJobApps(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.JobApplication_API + '/getAllJobApps');
  }
  // follow-up
  // get app-status-type
  getAppStatusTypes(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.JobApplication_API + '/getAppStatusTypes');
  }
  // follow-up-->job-app-view-dialog
  // view jobApplication
  viewJobApp(jobAppId): Observable<any> {
    return this.http.get<any>(this.JobApplication_API + '/viewJobApp/'+jobAppId);
  }

  // follow-up-->job-app-edit-dialog
  // edit jobApplication
  editJobApp(jobAppData): Observable<any> {
    return this.http.post(this.JobApplication_API + '/editJobApplication', jobAppData)
  }
  
  // follow-up-->job-app-delete-dialog
  // delete jobApplication
  deleteJobApp(jobAppData): Observable<any> {
    return this.http.post(this.JobApplication_API + '/deleteJobApplication', jobAppData)
  }

  // UW
  getUutGrpByDebitCredit_GL_Number(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.UW_API + '/getUUTGrp_DebitCredit_GL_Number');    
  }

  // file-upload  
  upload(resumeUpload: ResumeUpload): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    // formData.append('file', resumeUpload.resumeFile);
    formData.append('resumeFile', resumeUpload.resumeFile);
    formData.append('jobApplicationId', resumeUpload.jobApplicationId.toString());
    // formData.append('jobApplicationId', "invalid-object-property");
    const req = new HttpRequest('POST', `${this.JobResume_API}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  // file-download
  download(jobApplicationId: number): Observable<Blob> {
    return this.http.get<Blob>(this.JobResume_API + '/download/'+jobApplicationId,
      { responseType: 'blob' as 'json' });
  }
  
  // create and download resume
  createAndDownloadResume(myResume): Observable<Blob> {
    return this.http.post<Blob>(this.ResumeCreator_API + '/createAndDownloadResume',myResume,
      { responseType: 'blob' as 'json' });
  }

  // create and email resume
  createAndEmailResume(myResume): Observable<string> {
    return this.http.post<string>(this.ResumeCreator_API + '/createAndEmailResume', myResume,
      { responseType: 'string' as 'json' });
  }

  // follow-up-->app-status-track-dialog
  trackJobAppStatus(jobAppId): Observable<any> {
    return this.http.get<any>(this.JobApplication_API + '/trackJobAppStatus/' + jobAppId);
  }

  // view-user-resume-create-data
  // get all userResumeCreate
  getUserResumeCreateData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.ResumeCreator_API + '/getUserResumeCreateData');
  }

  // view-user-resume-email-data
  // get all userResumeEmail
  getUserResumeEmailData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.ResumeCreator_API + '/getUserResumeEmailData');
  }
}