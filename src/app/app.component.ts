import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quy Trieu';
  constructor(private accountServices: AccountService){
  }
  ngOnInit(): void {
    this.accountServices.reLogin();
  }

}
