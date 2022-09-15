import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-resume-creator',
  templateUrl: './resume-creator.component.html',
  styleUrls: ['./resume-creator.component.css']
})
export class ResumeCreatorComponent implements OnInit {

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) { }

  ngOnInit(): void {  
  }

}