import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  getPlayers = "http://localhost:3000/api/players"
  login = "http://localhost:3000/api/login"
  players = "http://localhost:3000/api/players"
  search = "http://localhost:3000/api/search"

  constructor(private http:HttpClient) { }
  getAllPlayers(){
    return this.http.get(this.getPlayers)
  }
  UserLogin(data:any){
    return this.http.post(this.login, data, {
      observe: 'response'
   })
  }
  savePlayer(data:any){
    return this.http.post(this.players, data,{
      observe: 'response'
    })
  }
  updatePlayer(id:string,data:any){
    return this.http.patch(this.players+'/'+id, data,{
      observe: 'response'
    })
  }
  getSinglePlayer(id:string){
    return this.http.get(this.players+'/'+id)
  }
  deletePlayer(id:string){
    return this.http.delete(this.players+'/'+id)
  }
  searchPlayer(name:string){
    return this.http.post(this.search, name, {
      observe: 'response'
    })
  }
}
