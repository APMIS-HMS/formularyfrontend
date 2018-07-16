import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { SystemModuleService, UserService } from '../../services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public registerGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    private _systemModuleService: SystemModuleService
  ) { }

  ngOnInit() {
    this.registerGroup = this.formBuilder.group({
      firstName: ['', [<any>Validators.required]],
      lastName: ['', [<any>Validators.required]],
      email: ['', [<any>Validators.required]],
      username: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    });
  }

  onClickSignUp(valid: boolean, user: User) {
    if (valid) {
      this._userService.create(user).then(res => {
        console.log(res);
        if (!!res._id) {
          this.registerGroup.reset();
          this._systemModuleService.announceSweetProxy('Redirecting...', 'timer', this, 'I will close in <strong></strong> seconds.');
          this._systemModuleService.announceSweetProxy('You have successfully registered', 'success');
        } else {
          this._systemModuleService.announceSweetProxy('There was a problem in the process, pleas try again later!', 'error');
        }
      }).catch(err => {
        console.log(err);
        // conflict
        if (err.code === 409) {
          this._systemModuleService.announceSweetProxy(err.message, 'error');
        } else {
          this._systemModuleService.announceSweetProxy(err.message, 'error');
        }
      });
    } else {
      this._systemModuleService.announceSweetProxy('Some fields are missing', 'error');
    }
  }

  sweetAlertCallback(result, from) {
    this.login('login');
  }

  login(route?: any) {
    console.log(route);
    (!!route && route !== null) ? route = route : route = 'login';
    this._router.navigate([`/auth/${route}`]);
  }
}
