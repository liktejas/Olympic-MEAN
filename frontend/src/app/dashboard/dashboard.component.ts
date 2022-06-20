import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {}
  addPlayer:boolean=false
  component:String='content'
  playerID:string = ''

  getComponent(item:String){
    console.warn(item)
    if(item == 'addPlayer'){
      this.component = 'addPlayer'
    }
    if(item == 'content'){
      this.component = 'content'
    }
    if(item.slice(0, 12) == 'updatePlayer'){
      this.component = 'updatePlayer'
      this.playerID = item.slice(12)
    }
  }
}
