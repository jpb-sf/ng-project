import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }
  

  get getDate(): string
  {
    let currentDate = new Date();
    return formatDate(currentDate, 'MM/dd/yyyy', 'en-US')
  }

  get getTime(): string
  {
    let currentDate = new Date();
    return formatDate(currentDate, 'hh:mm aa', 'en-US')
  }
}
