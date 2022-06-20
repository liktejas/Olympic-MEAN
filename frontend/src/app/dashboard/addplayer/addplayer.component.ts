import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { PlayersService } from '../../services/players.service'

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.css']
})
export class AddplayerComponent implements OnInit {

  @Output() getComponentName = new EventEmitter<String>() 

  constructor(private playerData: PlayersService) { }

  ngOnInit(): void {
  }

  allPlayers:any
  saveDataSuccess:boolean = false
  saveDataFailed:boolean = false
  addPlayerForm = new FormGroup({
    ranking : new FormControl('', [Validators.required]),
    name : new FormControl('', [Validators.required]),
    dob : new FormControl('', [Validators.required]),
    country : new FormControl('', [Validators.required]),
    score : new FormControl('', [Validators.required]),
    event : new FormControl('100m')
  })

  addPlayer(){
    console.log(this.addPlayerForm.value)
    this.playerData.savePlayer(this.addPlayerForm.value).subscribe((data)=>{
      console.log(data)
      this.allPlayers = data
      this.addPlayerForm.reset()
      this.saveDataSuccess = true
    }, (error) => {
      console.log(error)
      this.saveDataFailed = true
    })
    this.saveDataFailed = false
  }

  get ranking() { return this.addPlayerForm.get('ranking') }
  get name() { return this.addPlayerForm.get('name') }
  get dob() { return this.addPlayerForm.get('dob') }
  get country() { return this.addPlayerForm.get('country') }
  get score() { return this.addPlayerForm.get('score') }

}
