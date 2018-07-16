import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemModuleService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _systemModuleService: SystemModuleService
  ) { }

  ngOnInit() {
    this.loginGroup = this.formBuilder.group({
      username: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    });
  }

  onClickSignUp(route) {
    this._router.navigate([`/auth/${route}`]);
  }

  onClickLogin(valid: boolean, value: any) {
    if (valid) {
      this._router.navigate(['/modules/products']);
    } else {
      this._systemModuleService.announceSweetProxy('Some fields are missing!', 'error');
    }
  }

}
