import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../_models/app-user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authUser: AuthUser = {username: 'string', password: 'string'};
  constructor(public accountServices: AccountService) { }

  ngOnInit(): void {
  }
  login(){
    this.accountServices.login(this.authUser)
      .subscribe(res => console.log(res),
        err => console.log(err)
    )};
    logout(){
      this.accountServices.logout();
    }
}
