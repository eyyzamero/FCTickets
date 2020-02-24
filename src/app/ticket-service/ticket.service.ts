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
          severity: data.severity,
          category: data.category,
          title: data.title,
          location: data.location,
          code: data.code,
          quantity: data.quantity,
          assignedGroup: data.assignedGroup,
          content: data.content,
          userID: data.userID,
          asigneeID: data.asigneeID,
          HPOE: data.HPOE,
          status: true
        }
      )
      .subscribe(resData => {
        // TODO create some kind of informative dialog. For now log

        const newTicket = new Ticket(
          resData.ticket_id,
          data.severity,
          data.category,
          data.title,
          data.location,
          data.code,
          data.quantity,
          data.assignedGroup,
          data.content,
          data.userID,
          data.asigneeID,
          data.HPOE,
          data.status
        );

        // Inform subscribers about changes in tickets array
        this._ticketsArray.next(this._ticketsArray.value.concat(newTicket));
        this.logService.newLog({
          _id: null,
          ticket_id: resData.ticket_id,
          userID: data.userID,
          log_type: "TT_CREATE",
          content: `TT ${resData.ticket_id} created`,
          creationDate: Date.now().toString()
        });
      });
  }

  updateTicket(ticketId: string, data: Ticket) {
    return this.httpClient
      .put(`http://localhost:4201/api/tickets/${ticketId}`, {
        _id: ticketId,
        severity: data.severity,
        category: data.category,
        title: data.title,
        location: data.location,
        code: data.code,
        quantity: data.quantity,
        assignedGroup: data.assignedGroup,
        content: data.content,
        userID: data.userID,
        asigneeID: data.asigneeID,
        HPOE: data.HPOE,
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
            data.severity,
            data.category,
            data.title,
            data.location,
            data.code,
            data.quantity,
            data.assignedGroup,
            data.content,
            data.userID,
            data.asigneeID,
            data.HPOE,
            data.status
          );
          this._ticketsArray.next(this._ticketsArray.value.concat(ticketData));

          this.logService.newLog({
            _id: null,
            ticket_id: ticketId,
            userID: data.userID,
            log_type: "TT_UPDATE",
            content: `TT ${ticketId} updated`,
            creationDate: Date.now().toString()
          });
        })
      );
  }

  closeTicket(ticketId: string, userID: string) {
    this.logService.newLog({
      _id: null,
      ticket_id: ticketId,
      userID: userID,
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
