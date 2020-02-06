import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Ticket } from './ticket.model';

@Injectable({providedIn: 'root'})

export class TicketService {

  private _ticketsArray = new BehaviorSubject<Ticket[]>([]);

  get Tickets() {
    return this._ticketsArray.asObservable();
  }

  constructor(private httpClient: HttpClient) {}


  getTickets() {
    return this.httpClient.get<Ticket[]>('http://localhost:4201/api/tickets')
      .pipe(map(resData => {
        let TTs = [];
        TTs = resData;
        return TTs;
      }),
      tap(tickets => {
        this._ticketsArray.next(tickets);
      })
    );
  }

  newTicket(data: Ticket) {
    return this.httpClient.post<{message: string, ticket_id: string}>(
      'http://localhost:4201/api/tickets/new', {
        category: data.category,
        title: data.title,
        location: data.location,
        code: data.code,
        quantity: data.quantity,
        assignedGroup: data.assignedGroup,
        content: data.content
      }
    ).subscribe((resData) => {
      // TODO create some kind of informative dialog. For now log
      console.log('[ ' + resData.ticket_id + ' ] - ' + resData.message);

      const newTicket = new Ticket(
        resData.ticket_id,
        data.category,
        data.title,
        data.location,
        data.code,
        data.quantity,
        data.assignedGroup,
        data.content
      );

      // Inform subscribers about changes in tickets array
      this._ticketsArray.next(this._ticketsArray.value.concat(newTicket));
      });
  }
}
