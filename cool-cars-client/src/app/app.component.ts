import { Component, OnInit, OnDestroy } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  oktaSubscription: Subscription;

  constructor(public oktaAuthService: OktaAuthService) {}

  async ngOnInit(): Promise<any> {
    this.isAuthenticated = await this.oktaAuthService.isAuthenticated();
    this.oktaSubscription = this.oktaAuthService.$authenticationState
      .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  ngOnDestroy(): void {
    if (this.oktaSubscription && !this.oktaSubscription.closed) {
      this.oktaSubscription.unsubscribe();
    }
  }
}
