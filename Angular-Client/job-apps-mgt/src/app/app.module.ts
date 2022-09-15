import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular-material
import { MaterialModule } from './material.module';
/*
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
*/
//// components
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { ApplyToJobComponent } from './components/apply-to-job/apply-to-job.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { JobAppViewDialogComponent } from './components/job-app-view-dialog/job-app-view-dialog.component';
import { JobAppEditDialogComponent } from './components/job-app-edit-dialog/job-app-edit-dialog.component';
import { JobAppDeleteDialogComponent } from './components/job-app-delete-dialog/job-app-delete-dialog.component';
import { AppStatusTrackDialogComponent } from './components/app-status-track-dialog/app-status-track-dialog.component';
import { JobResumeUploadComponent } from './components/job-resume-upload/job-resume-upload.component';
import { JobSearchComponent } from './components/job-search/job-search.component';
import { ResumeCreatorComponent } from './components/resume-creator/resume-creator.component';
import { UniversityWinnipegComponent } from './components/university-winnipeg/university-winnipeg.component';
import { ViewUserDataComponent } from './components/view-user-data/view-user-data.component';
import { AddEducationComponent } from './components/resume-components/add-education/add-education.component';
import { AddWorkExperienceComponent } from './components/resume-components/add-work-experience/add-work-experience.component';
import { EditEducationComponent } from './components/resume-components/edit-education/edit-education.component';
import { EditWorkExperienceComponent } from './components/resume-components/edit-work-experience/edit-work-experience.component';
import { EducationCreateComponent } from './components/resume-components/education-create/education-create.component';
import { PersonalInfoCreateComponent } from './components/resume-components/personal-info-create/personal-info-create.component';
import { SaveAndViewResumeComponent } from './components/resume-components/save-and-view-resume/save-and-view-resume.component';
import { TechnicalSkillCreateComponent } from './components/resume-components/technical-skill-create/technical-skill-create.component';
import { WorkExperienceCreateComponent } from './components/resume-components/work-experience-create/work-experience-create.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    ApplyToJobComponent,
    FollowUpComponent,
    JobAppViewDialogComponent,
    JobAppEditDialogComponent,
    JobAppDeleteDialogComponent,
    AppStatusTrackDialogComponent,
    JobResumeUploadComponent,
    JobSearchComponent,
    ResumeCreatorComponent,
    UniversityWinnipegComponent,
    ViewUserDataComponent,
    AddEducationComponent,
    AddWorkExperienceComponent,
    EditEducationComponent,
    EditWorkExperienceComponent,
    EducationCreateComponent,
    PersonalInfoCreateComponent,
    SaveAndViewResumeComponent,
    TechnicalSkillCreateComponent,
    WorkExperienceCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    /*
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    */
  ],
   providers: [HttpClientModule,   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
