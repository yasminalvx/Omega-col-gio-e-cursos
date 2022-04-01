import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './../guards/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  async onClick() {
    localStorage.clear();
    console.log(this.form);
    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;

      let isAuthenticated = await this.authService.AuthAdmin(email, password);
      if (isAuthenticated == true) {
        localStorage.setItem('typeAccount', 'admin');
        this.router.navigate(['admin']);
      }
    }
  }

}
