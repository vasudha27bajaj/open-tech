import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Tracker_List } from './time-tracker.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {
  @ViewChild('addTask') addTask!: TemplateRef<any>;
  trackerList:Tracker_List[] = [{heading:'Adding animations to the website',
  history:['No history found, click on the start button to track the timer']}];
  constructor(private matdialog:MatDialog) { }

  ngOnInit(): void {
  }

  openAddTaskPopup():void{
    const dialog = this.matdialog.open(this.addTask);
  }

}
