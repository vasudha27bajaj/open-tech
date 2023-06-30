import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Timer_History, Tracker_List } from './time-tracker.model';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {
  @ViewChild('addTask') addTask = {} as TemplateRef<any>; 
  trackerList:Tracker_List[] = [];
  noHistoryFoundText = 'No history found, click on the start button to track the timer';
  newTask = '';
  timer:string = '';
  interval:any;
  startTime:number = 0;
  elapsedTime:number = 0;
  
  constructor(private matdialog:MatDialog,private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.timer = '00:00:00';
  }

  openAddTaskPopup():void{
    const dialog = this.matdialog.open(this.addTask,{
      minWidth:'25rem'
    });
    dialog.afterClosed().subscribe((res)=>{
      if(res){
        const time = '00:00:00';
        const taskToAdd:Tracker_List = {heading:this.newTask,history:[],timer:time,showTimer:false,totalTime:0};
        this.trackerList.push(taskToAdd);
        this.newTask = '';
      }
    })
  }

  get totalTimeSpend():number{
    let totaltime = 0;
    this.trackerList.forEach((res)=>{
      totaltime = totaltime + res.totalTime;
    })
    return Math.floor(totaltime);
  }

  startTimer(index:number):void{
    this.trackerList[index].showTimer = true;
    if(this.interval){
      this.stopTimer(index);
    }
    if(!this.interval){
      this.startTime = Date.now();
      this.interval = setInterval(()=>{
        const currentTime = Date.now();
        this.elapsedTime = currentTime - this.startTime;
        this.timer = this.formatTime(this.elapsedTime);
        this.trackerList[index].timer = this.timer;
      },1000);
    }
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const timer_history:Timer_History = { startDate : this.datePipe.transform(date,'dd/mm/yyyy'),startTime : time,stopDate:'',stopTime:''};
    this.trackerList[index].history.push(timer_history)
  }

  stopTimer(index:number):void{
    this.trackerList[index].showTimer = false;
    this.trackerList[index].timer = '00:00:00';
    if(this.interval){
      clearInterval(this.interval);
      this.interval = null;
    }
    const historyindex = this.trackerList[index].history.length;
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    this.trackerList[index].history[historyindex-1].stopDate = this.datePipe.transform(date,'dd/mm/yyyy');
    this.trackerList[index].history[historyindex-1].stopTime = time;
    const test = this.trackerList[index].history[historyindex-1].stopDate;
    const stoptime = this.parseDateString(this.trackerList[index].history[historyindex-1].stopDate,this.trackerList[index].history[historyindex-1].stopTime);
    const startTime = this.parseDateString(this.trackerList[index]?.history[historyindex-1].startDate,this.trackerList[index]?.history[historyindex-1].startTime);
    let diff:any = (stoptime.getTime() - startTime.getTime())/(1000);
    diff = diff/3600;
    this.trackerList[index].totalTime = this.trackerList[index].totalTime + diff;
  }

  parseDateString(dateString:string,timestring:string):Date{
    const parts = dateString.split('/');
    const time = timestring.split(':');
    const year = +parts[0];
    const month = +parts[1];
    const day = +parts[2];
    const hours = 0;
    const date = new Date(year,month,day);
    date.setHours(parseInt(time[0]));
    date.setMinutes(parseInt(time[1]));
    date.setSeconds(parseInt(time[2]));
    return date;
  }

  formatTime(time:number):string{
    const seconds = Math.floor(time/1000) % 60;
    const minutes = Math.floor(time/1000/60) % 60;
    const hours = Math.floor(time/1000/60/60); 

    return(this.padNumber(hours,2) +
    ' : ' + this.padNumber(minutes,2) + 
    ' : ' + this.padNumber(seconds,2)
    );
  }

  padNumber(num:Number,length:number):string{
    return num.toString().padStart(length,'0');
  }

  deleteTask(index:number):void{
    this.trackerList.splice(index,1);
  }

  
}
