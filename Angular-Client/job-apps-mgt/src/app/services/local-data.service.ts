import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  private MyJobs;
  private JobApp;
  private PersonalInfo;
  private Skills;
  private WorkExperience;
  private Education;

  constructor() { }

  setEducation(val) {
    this.Education = val;
  }
  getEducation() {
    return this.Education;
  }

  setWorkExperience(val) {
    this.WorkExperience = val;
  }
  getWorkExperience() {
    return this.WorkExperience;
  }

  setSkills(val) {
    this.Skills = val;
  }
  getSkills() {
    return this.Skills;
  }

  setPersonalInfo(val) {
    this.PersonalInfo = val;
  }
  getPersonalInfo() {
    return this.PersonalInfo;
  }

  setMyJobs(val) {
    this.MyJobs = val;
  }
  getMyJobs() {
    return this.MyJobs;
  }


  setJobApp(val) {
    this.JobApp = val;
  }
  getJobApp() {
    return this.JobApp;
  }

  // convert [{string}]=>[{int,string}]
  // string == appStatusType enum @ api
  getAppStatusTypesCollection(appStatusTypesCollection: string[]): Array<any> {
    var appStatusTypes = Array<any>();
    var i = 0;
    appStatusTypesCollection.forEach((element) => {
      appStatusTypes.push({
        indexValue: i,
        appStatus: element
      });
      i++;
    });
    return appStatusTypes;
  }
  // return color as per appStatusType
  getAppStatusTypeColor(appStatusType) {
    if (appStatusType == 0)
      return 'maroon';
    else if (appStatusType == 1)
      return 'blue';
    else if (appStatusType == 2)
      return 'green';
    else if (appStatusType == 3)
      return 'red';
    else if (appStatusType == 6) // Closed
      return 'orange';
    else
      return 'purple';
  }

  // return country collection
  getCountries(): Array<string> {
    let Countries: string[] = [];
    Countries.push("Canada");
    Countries.push("USA");
    Countries.push("Mexico");
    Countries.push("England");
    Countries.push("India");
    return Countries;
  }  
  // return province collection
  getProvinces(): Array<string>{
    let provinces: string[] = [];
    provinces.push("MB");
    provinces.push("ON");
    provinces.push("AB");
    provinces.push("SK");
    provinces.push("BC");
    return provinces;
  }
  // return city collection as per province input
  getCities(province: string): Array<string> {
    let cities: string[] = [];

    if (province == "MB") {
      cities.push("Winnipeg");
      cities.push("Brandon");
    }
    else if (province == "ON") {
      cities.push("Toronto");
      cities.push("Missisauga");
      cities.push("Brampton");
      cities.push("London");
    }
    else if (province == "AB") {
      cities.push("Calgary");
      cities.push("Edmonton");
    }
    else if (province == "BC") {
      cities.push("Vancouver");
      cities.push("Burnaby");
    }
    else if (province == "SK") {
      cities.push("Saskatoon");
      cities.push("Regina");
    }
    return cities;
  }

  // 400
  // error handler
  display400andEx(error, componentName): string[] {
    var errors = [];
    if (error.status == 400) {
      // console.log(error.error.error[0]);
      if (error.error.error != null) {
        for (var key in error.error.error) {
          errors.push(error.error.error[key]);
        }
      } else {
        errors.push('[' + componentName + '] Data Not Found ! / Bad Request !');
      }
    }
    else {
      console.log(error);
    }
    return errors;
  }

}
