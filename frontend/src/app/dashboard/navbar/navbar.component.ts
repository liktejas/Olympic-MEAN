import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookie: CookieService, private router:Router) { }

  ngOnInit(): void {
  }

  signOut(){
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'No, I want to stay'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cookie.delete('admin')
        this.router.navigate(['/']);
        Swal.fire(
          'Logged Out!',
          'You have been logged out successfully.',
          'success'
        )
      }
    })
  }

}
