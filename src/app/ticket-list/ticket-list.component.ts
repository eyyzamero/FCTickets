import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { TicketService } from "../ticket-service/ticket.service";
import { Ticket } from "../ticket-service/ticket.model";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-ticket-list",
  templateUrl: "./ticket-list.component.html",
  styleUrls: ["./ticket-list.component.css"]
})
export class TicketListComponent implements OnInit, OnDestroy {
  constructor(
    private _ticketService: TicketService,
    public auth: AuthService
  ) {}

  isLoading = true;
  ticketsArray: Ticket[];
  ticketsSubscription: Subscription;
  tt: Ticket;

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
        this._ticketService.getTickets(+"10").subscribe(() => {
          this.isLoading = false;
        });
      }
    }, 500);
  }

  ngOnDestroy() {
    this.ticketsSubscription.unsubscribe();
  }
}
