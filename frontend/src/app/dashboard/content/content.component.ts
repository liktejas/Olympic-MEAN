import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router';
import { PlayersService } from '../../services/players.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Output() getComponentName = new EventEmitter<String>() 

  constructor(private cookie: CookieService, private router:Router, private playerData: PlayersService) { }

  allPlayers:any
  isDeleteSuccess:boolean = false
  isDeleteFailed:boolean = false
  ngOnInit(): void {
    if(this.cookie.get('admin') == ''){
      this.router.navigate(['/']);
    }else{
      this.playerData.getAllPlayers().subscribe((data)=>{
        this.allPlayers = data
        console.log(this.allPlayers)
      })
    }
  }

  deletePlayer(id:string){
    console.log(id)

    Swal.fire({
      title: 'Delete this Player?',
      text: "Do you want to delete this player?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, Do not Delete it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.playerData.deletePlayer(id).subscribe((data)=>{
          console.log(data)
          this.isDeleteSuccess = true
          this.allPlayers = this.allPlayers.filter((player:any) => {return player._id != id})
          Swal.fire(
            'Deleted!',
            'Player Deleted successfully.',
            'success'
          )
        },(error)=>{
          console.log(error)
          this.isDeleteFailed = true
          Swal.fire({
            icon: 'error',
            title: 'Failed to Delete Player'
          })
        })
        
      }
    })

    
    this.isDeleteSuccess = false
    this.isDeleteFailed = false
  }

  searchPlayerForm = new FormGroup({
    search : new FormControl('', [Validators.required])
  })

  isSearchFailed:boolean = false
  searchPlayer(){
    console.log(this.searchPlayerForm.value.search)
    this.playerData.searchPlayer(this.searchPlayerForm.value).subscribe((result)=>{
      console.log(result.body)
      this.allPlayers = result.body
      this.searchPlayerForm.reset()
    }, (error)=>{
      console.log(error)
      this.isSearchFailed = true
    })
    this.isSearchFailed = false
  }

  get search() { return this.searchPlayerForm.get('search') }

  resetList(){ 
    this.ngOnInit()
  }

}
