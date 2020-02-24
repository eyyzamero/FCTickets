import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private loggedUserData;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 3000
    });
  }

  updateSubscription(sub_group: string) {
    this.httpClient
      .post(`http://localhost:4201/api/sub`, {
        userID: this.loggedUserData.sub,
        subbed_group: sub_group
      })
      .subscribe(() => {
        this.openSnackBar("You have successfully subscribed!");
      });
  }

  ngOnInit() {
    this.authSub = this.authService.userProfile$.subscribe(data => {
      this.loggedUserData = data;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
