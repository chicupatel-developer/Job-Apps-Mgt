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
