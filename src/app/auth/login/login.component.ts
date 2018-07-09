import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public frm_login: FormGroup;

  constructor(private formBuilder: FormBuilder,private _router: Router) { }

  ngOnInit() {
    this.frm_login = this.formBuilder.group({
      username: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    });
  }

  signin_click(params){
    this._router.navigate(['/modules/products']);
  } 
  signup(){
    this._router.navigate(['/auth/signup']);
  } 

}
