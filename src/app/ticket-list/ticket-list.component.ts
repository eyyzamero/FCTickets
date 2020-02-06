import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketService } from '../ticket-service/ticket.service';
import { Ticket } from '../ticket-service/ticket.model';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent {

  constructor(private _ticketService: TicketService) {}

  isLoading = true;
  ticketsArray: Ticket[];
  ticketsSubscription: Subscription;

  ngOnInit() {

    this.ticketsSubscription = this._ticketService.Tickets.subscribe(tickets => {
      this.ticketsArray = tickets;
    });
    this._ticketService.getTickets().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.ticketsSubscription.unsubscribe();
  }

}
