export interface Tracker_List {
    heading:string;
    history:Timer_History[];
    timer:any;
    showTimer?:boolean;
    totalTime?:any;
}

export interface Timer_History {
    startDate:any;
    startTime:string;
    stopDate:any;
    stopTime:string;
}