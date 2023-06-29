import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Tracker_List } from './time-tracker.model';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {
  @ViewChild('addTask') addTask = {} as TemplateRef<any>; 
  trackerList:Tracker_List[] = [{heading:'Adding animations to the website',
  history:[]}];
  noHistoryFoundText = 'No history found, click on the start button to track the timer';
  newTask = '';
  constructor(private matdialog:MatDialog) { }

  ngOnInit(): void {
  }

  openAddTaskPopup():void{
    const dialog = this.matdialog.open(this.addTask,{
      minWidth:'25rem'
    });
    dialog.afterClosed().subscribe((res)=>{
      if(res){
        const taskToAdd:Tracker_List = {heading:this.newTask,history:[]};
        this.trackerList.push(taskToAdd);
        console.log(res);
      }
    })
  }

}
