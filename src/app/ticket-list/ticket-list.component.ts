import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { TicketService } from "../ticket-service/ticket.service";
import { Ticket } from "../ticket-service/ticket.model";
import { AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-ticket-list",
  templateUrl: "./ticket-list.component.html",
  styleUrls: ["./ticket-list.component.css"]
})
export class TicketListComponent implements OnInit, OnDestroy {
  constructor(
    private _ticketService: TicketService,
    public auth: AuthService,
    private httpClient: HttpClient
  ) {}

  isLoading = true;
  ticketsArray: Ticket[];
  ticketsSubscription: Subscription;
  tt: Ticket;
  private userData;
  userSubscribedGroup;

  ngOnInit() {
    // Wait until all the variables are created and then decide whether or not to fetch data
    setTimeout(() => {
      if (this.auth.isAuthenticated$) {
        this.ticketsSubscription = this._ticketService.Tickets.subscribe(
          tickets => {
            this.ticketsArray = tickets;
          }
        );
        this._ticketService
          .getTicket("5e3c4b1dfa06bc2e189d4577")
          .subscribe(resData => {
            this.tt = resData;
          });
        this._ticketService.getTickets(+"10").subscribe(() => {});
        this.auth.userProfile$.subscribe(userData => {
          this.userData = userData;
        });

        this.auth
          .createLocalDBRecordForUser(
            this.userData.sub,
            this.userData.name,
            this.userData.picture
          )
          .subscribe();

        this.httpClient
          .get(`http://localhost:4201/api/sub/${this.userData.sub}`)
          .subscribe(sub => {
            this.userSubscribedGroup = sub;
            this.isLoading = false;
          });
      }
    }, 500);
  }

  ngOnDestroy() {
    this.ticketsSubscription.unsubscribe();
  }
}
