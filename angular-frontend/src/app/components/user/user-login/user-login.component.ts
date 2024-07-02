import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  loginForm!: FormGroup

  userService = inject(UserService);
  router = inject(Router);

 
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }  

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.userService.login(this.f['username'].value, this.f['password'].value).pipe(first()).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/contracts-list'])
        }
      )
  }  
}



