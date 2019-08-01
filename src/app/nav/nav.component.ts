import { Component, OnInit, Input } from '@angular/core';
import { Subscription} from 'rxjs';
import { AuthService } from '../_services/auth/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Student } from '../_models/student.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
@Input() student: Student;
isAuth: boolean;
private authListenerSubs: Subscription;

  constructor(private authService: AuthService,
              public NgxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    console.log(this.authService.getAuthStatusListener())
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
      console.log(isAuthenticated);
    })
  }

  onLogout() {
    this.NgxSmartModalService.open('onLogout');
    this.authService.logout();
  }

}
