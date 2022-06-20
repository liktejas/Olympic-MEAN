import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { PlayersService } from '../services/players.service'
import { CookieService } from 'ngx-cookie-service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private playerData: PlayersService, private cookie: CookieService, private router:Router) {
  }

  ngOnInit(): void {
    if(this.cookie.get('admin') != ''){
      this.router.navigate(['/dashboard']);
    }
  }

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  login:boolean = true

  userDataResponse:any

  loginUser(){
    this.playerData.UserLogin(this.loginForm.value).subscribe((result)=>{
      // console.log(this.loginForm.value.email)
      this.userDataResponse = result.body
      this.cookie.set("admin", this.userDataResponse.name)
      this.loginForm.reset()
      Swal.fire({
        icon: 'success',
        title: 'Login Successfull'
      })
      this.router.navigate(['/dashboard']);
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Login Failed, Please Try Again',
      })
      console.log(error)
      this.login = false
    }
    )}

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

}
