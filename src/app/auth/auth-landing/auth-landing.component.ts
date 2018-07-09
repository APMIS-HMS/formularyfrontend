import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss']
})
export class AuthLandingComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  signin(){
    this._router.navigate(['/auth/signin']);
  }
  signup(){
    this._router.navigate(['/auth/signup']);
  }

}
