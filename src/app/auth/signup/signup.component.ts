import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public frm_login: FormGroup;

  constructor(private formBuilder: FormBuilder,private _router: Router) { }

  ngOnInit() {
    this.frm_login = this.formBuilder.group({
      username: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    });
  }

  signin(params) 
  {
    this._router.navigate(['/auth/signin']);
  }
  signup_click(params)
  {
    this._router.navigate(['modules/products']);
  }

}
