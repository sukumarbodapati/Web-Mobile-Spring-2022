import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  //Intialized the element
  counter = "";
  constructor() { }

  ngOnInit(): void {

  }
  //created a new element and assigned the event date
  coudown = new Date("march 8, 2022 15:35:25").getTime();
  //this method calls the function continously with a time delay if needed
  x = setInterval(() => {
    //Assign with the todays and convert into milliseconds
    var today = new Date().getTime();
    //calculate the difference between event date and today's date
    var diff = this.coudown - today;
    //calculate the days,hours,minutes,seconds
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hrs = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var min = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    var sec = Math.floor(diff % (1000 * 60) / (1000));
    //Assisgn all the value to the counter string
    this.counter = days + " d " + hrs + "h " + min + "m " + sec + "s";

  })


}
