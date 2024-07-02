import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ContractListComponent } from '../../../components/contract/contract-list/contract-list.component';
import { CustomerListComponent } from '../../../components/customer/customer-list/customer-list.component';
import { UserLoginComponent } from '../../../components/user/user-login/user-login.component';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, ContractListComponent,CustomerListComponent, UserLoginComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  loggedIn = false;
  
  httpClient = inject(UserService);

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe((status) => {
      this.loggedIn = status;
    });
  }

  userService = inject(UserService);
  router = inject(Router);

  logout() {
    this.userService.logout();
    this.router.navigate(['user-login']);      
  }
}
