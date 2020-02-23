import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, ObservableInput } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";
import { Ticket } from "./ticket.model";
import { LogsService } from "../services/logs.service";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
export class TicketService {
  private _ticketsArray = new BehaviorSubject<Ticket[]>([]);

  get Tickets() {
    return this._ticketsArray.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private logService: LogsService,
    private authService: AuthService
  ) {}

  getTickets(numOfTickets?: number) {
    console.log(numOfTickets);
    let queryParams;
    numOfTickets === undefined
      ? (queryParams = undefined)
      : (queryParams = `?pageSize=${numOfTickets}`);
    return this.httpClient
      .get<Ticket[]>("http://localhost:4201/api/tickets" + queryParams)
      .pipe(
        map(resData => {
          let TTs = [];
          TTs = resData;
          return TTs;
        }),
        tap(tickets => {
          this._ticketsArray.next(tickets);
        })
      );
  }

  getTicket(ticketId: string) {
    return this.httpClient.get<Ticket>(
      `http://localhost:4201/api/tickets/${ticketId}`
    );
  }

  newTicket(data: Ticket) {
    return this.httpClient
      .post<{ message: string; ticket_id: string }>(
        "http://localhost:4201/api/tickets/new",
        {
          category: data.category,
          title: data.title,
          location: data.location,
          code: data.code,
          quantity: data.quantity,
          assignedGroup: data.assignedGroup,
          content: data.content,
          status: true
        }
      )
      .subscribe(resData => {
        // TODO create some kind of informative dialog. For now log
        console.log("[ " + resData.ticket_id + " ] - " + resData.message);

        const newTicket = new Ticket(
          resData.ticket_id,
          data.category,
          data.title,
          data.location,
          data.code,
          data.quantity,
          data.assignedGroup,
          data.content,
          true
        );

        // Inform subscribers about changes in tickets array
        this._ticketsArray.next(this._ticketsArray.value.concat(newTicket));
        this.logService.newLog({
          _id: null,
          ticket_id: resData.ticket_id,
          userID: data.code,
          log_type: "TT_CREATE",
          content: `TT ${resData.ticket_id} created`,
          creationDate: Date.now().toString()
        });
      });
  }

  updateTicket(ticketId: string, data: Ticket) {
    return this.httpClient
      .put(`http://localhost:4201/api/tickets/${ticketId}`, {
        id: ticketId,
        category: data.category,
        title: data.title,
        location: data.location,
        code: data.code,
        quantity: data.quantity,
        assignedGroup: data.assignedGroup,
        content: data.content,
        status: data.status
      })
      .pipe(
        map(resData => {
          let oldTicketsArray = [];
          oldTicketsArray = [...this._ticketsArray.value];
          return oldTicketsArray;
        }),
        tap(() => {
          const ticketData = new Ticket(
            ticketId,
            data.category,
            data.title,
            data.location,
            data.code,
            data.quantity,
            data.assignedGroup,
            data.content,
            data.status
          );
          this._ticketsArray.next(this._ticketsArray.value.concat(ticketData));
        })
      );
  }

  closeTicket(ticketId: string) {
    this.logService.newLog({
      _id: null,
      ticket_id: ticketId,
      userID: "beee",
      log_type: "TT_CLOSED",
      content: `TT ${ticketId} closed`,
      creationDate: Date.now().toString()
    });
    return this.httpClient.patch(
      `http://localhost:4201/api/tickets/${ticketId}`,
      {
        status: false
      }
    );
  }
}
