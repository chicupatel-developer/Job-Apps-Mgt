import { Component, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LocalDataService } from 'src/app/services/local-data.service';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-technical-skill-create',
  templateUrl: './technical-skill-create.component.html',
  styleUrls: ['./technical-skill-create.component.css']
})
export class TechnicalSkillCreateComponent {

  @Input() pageHeader: string | undefined;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly separatorKeysCodes: number[] = [ENTER];

  skills: string[] = [];
  /*
  skills: Skill[] = [
    { name: "C#" },
    { name: "MVC" },
    { name: "Web API" }
  ];
  */

  saved = false;
  
  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
    this.skills.push('C#');
    this.skills.push('MVC');
    this.skills.push('Web API');
  }
  // prevent duplicate skill
  // add skill
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      /*
      if (!this.skills.find(t => t.name === value))
        this.skills.push({ name: value.trim() });
        */
      if (!this.skills.find(t => t === value))
        this.skills.push( value.trim() );
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }
  // remove skill
  remove(skill: string): void {
  // remove(skill: Skill): void {    
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
  // save skills to local-data-service
  saveSkills() {
    this.localDataService.setSkills(this.skills);
    console.log(this.localDataService.getSkills());

    this.saved = true;
    setTimeout(() => {
      this.saved = false;
    }, 3000);
  }

}