
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ISubscription } from 'rxjs/Subscription';
import { SystemModuleService } from './services/index';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  homePage = true;
  searchPage = false;
  addPage = false;
  private sweetAlertSubscription: ISubscription;

  constructor(
    private _systemModuleService: SystemModuleService,
  ) {
    console.log('Running');
    this.sweetAlertSubscription = this._systemModuleService.sweetAnnounced$.subscribe((value: any) => {
      this._sweetNotification(value);
    });
  }

   ngOnInit() {}

  _sweetNotification(value) {
    if (value.type === 'success') {
      swal({
        title: value.title,
        type: 'success',
        text: value.text,
        html: value.html,
        position: (value.position !== undefined && value.position !== null) ? value.position : 'top-end',
        showConfirmButton: (value.showConfirmButton !== undefined && value.showConfirmButton !== null) ? value.showConfirmButton : false,
        timer: (value.timer !== undefined && value.timer !== null) ? value.timer : 2000
      }).then(result => {
        if (value.cp !== undefined && value.cp !== null) {
          value.cp.sweetAlertCallback(result);
        }
      });
    } else if (value.type === 'error') {
      swal({
        title: value.title,
        type: 'error',
        text: value.text,
        html: value.html
      });
    } else if (value.type === 'info') {
      swal({
        title: value.title,
        type: 'info',
        text: value.text,
        html: value.html
      });
    } else if (value.type === 'warning') {
      swal({
        title: value.title,
        type: 'warning',
        text: value.text,
        html: value.html
      });
    } else if (value.type === 'question') {
      swal({
        title: value.title,
        text: value.text,
        type: value.type,
        html: value.html,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then(result => {
        value.cp.sweetAlertCallback(result, value.from);
      });
    } else if (value.type === 'timer') {
      let timerInterval;
      swal({
        title: value.title,
        html: value.html,
        timer: (value.timer !== undefined && value.timer !== null) ? value.timer : 2000,
        onOpen: () => {
          swal.showLoading();
          timerInterval = setInterval(() => {
            swal.getContent().querySelector('strong').textContent = '2';
          }, 100);
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        value.cp.sweetAlertCallback(result, value.from);
      });
    }
  }

  nav_search(){
    this.homePage = false;
    this.searchPage = true;
    this.addPage = false;
  }
  nav_add(){
    this.homePage = false;
    this.searchPage = false;
    this.addPage = true;
  }
  nav_home(){
    this.homePage = true;
    this.searchPage = false;
    this.addPage = false;
  }
}
