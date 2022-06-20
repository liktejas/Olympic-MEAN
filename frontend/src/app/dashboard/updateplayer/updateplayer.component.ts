import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { PlayersService } from '../../services/players.service'

@Component({
  selector: 'app-updateplayer',
  templateUrl: './updateplayer.component.html',
  styleUrls: ['./updateplayer.component.css']
})
export class UpdateplayerComponent implements OnInit {

  constructor(private playerData: PlayersService) {
  }

  @Output() getComponentName = new EventEmitter<String>()
  @Input() id = 'abc'

  playerid = ''
  _id:string = ''
  nameVar:string = ''
  countryVar:string = ''
  dobVar:string = ''
  event:string = ''
  rank:number = 0
  scoreVar:number = 0

  ngOnInit(): void {
    this.playerid = this.id
    this.playerData.getSinglePlayer(this.id).subscribe((data)=>{
      this.allPlayers = data
      const {_id:player_id, name, country, dob, event, ranking, score } = this.allPlayers

      this.updatePlayerForm = new FormGroup({
        player_id : new FormControl(player_id),
        ranking : new FormControl(ranking,),
        name : new FormControl(name),
        dob : new FormControl(dob),
        country : new FormControl(country),
        score : new FormControl(score),
        event : new FormControl(event)
      })

    })
  }

  allPlayers:any
  saveDataSuccess:boolean = false
  saveDataFailed:boolean = false
  updatePlayerForm = new FormGroup({
    player_id : new FormControl('', [Validators.required]),
    ranking : new FormControl('', [Validators.required]),
    name : new FormControl('', [Validators.required]),
    dob : new FormControl('', [Validators.required]),
    country : new FormControl('', [Validators.required]),
    score : new FormControl('', [Validators.required]),
    event : new FormControl('100m')
  })

  updatePlayer(){
    console.log(this.updatePlayerForm.value)
    console.log(this.updatePlayerForm.value.player_id)
    this.playerData.updatePlayer(this.updatePlayerForm.value.player_id, this.updatePlayerForm.value).subscribe((data)=>{
      console.log(data)
      this.allPlayers = data
      this.saveDataSuccess = true
    }, (error) => {
      console.log(error)
      this.saveDataFailed = true
    })
    this.saveDataSuccess = false
    this.saveDataFailed = false
  }

  get player_id() { return this.updatePlayerForm.get('player_id') }
  get ranking() { return this.updatePlayerForm.get('ranking') }
  get name() { return this.updatePlayerForm.get('name') }
  get dob() { return this.updatePlayerForm.get('dob') }
  get country() { return this.updatePlayerForm.get('country') }
  get score() { return this.updatePlayerForm.get('score') }

}
