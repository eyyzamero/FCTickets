import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { TicketService } from "../ticket-service/ticket.service";
import { Ticket } from "../ticket-service/ticket.model";
import { MatDialog } from "@angular/material/dialog";
import { NewTicketDialogComponent } from "../app.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConversationsService } from "../conversations_/conversation.service";
import { Message } from "../conversations_/message.model";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Log } from "../models/log.model";
import { LogsService } from "../services/logs.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-ticket-item",
  templateUrl: "./ticket-item.component.html",
  styleUrls: ["./ticket-item.component.css"]
})
export class TicketItemComponent implements OnInit, OnDestroy {
  TT: Ticket;
  isLoading = true;
  public Editor = DecoupledEditor;
  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  ttCreatorUserDataSub: Subscription;
  ttAsigneeUserDataSub: Subscription;
  ttCreatorUserData;
  ttAsigneeUserData;

  // Conversations declarations
  public messageText = "";
  MM: Message[] = [];
  commentsSubscription: Subscription;
  public userData;

  // Logs declarations
  LOG: Log[] = [];
  logSubscription: Subscription;

  constructor(
    public route: ActivatedRoute,
    public _ticketService: TicketService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    // Conversations setup
    private _conversationsService: ConversationsService,
    private authService: AuthService,
    private logService: LogsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this._ticketService.getTicket(paramMap.get("id")).subscribe(resData => {
          this.TT = resData;
          this.commentsSubscription = this._conversationsService.Messages.subscribe(
            comments => {
              this.MM = comments;
            }
          );
          // Conversation Setup
          this._conversationsService
            .getMessages(paramMap.get("id"))
            .subscribe(() => {
              this.authService.userProfile$.subscribe(res => {
                this.userData = res;
              });
            });
          // Logs Setup
          this.logSubscription = this.logService.Logs.subscribe(data => {
            this.LOG = data;
          });
          this.logService.getLogs(paramMap.get("id")).subscribe(() => {});
          this.ttCreatorUserDataSub = this.authService
            .getUserData(this.TT.userID)
            .subscribe(ttCreator => {
              this.ttCreatorUserData = ttCreator;
              this.isLoading = false;
            });
        });
      }
    });
  }

  TicketEdit(userId: string, mode: string, ticket_id?: string) {
    const dialogReference = this.dialog.open(NewTicketDialogComponent, {
      panelClass: "TicketFormDialog",
      width: "80%",
      height: "90%",
      data: { id: userId, mode: mode, ticket_id: ticket_id }
    });
  }

  CloseTicket(ticketId: string) {
    this._ticketService
      .closeTicket(ticketId, this.userData.sub)
      .subscribe(x => {
        this.openSnackBar("Ticket Successfully Closed!");
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 3000
    });
  }

  // Conversations Section
  newMessage(ticketId: string) {
    if (this.messageText.length !== 0) {
      this._conversationsService.newMessage({
        _id: null,
        ticket_id: ticketId,
        createdBy: this.userData.name,
        content: this.messageText,
        likes: 0,
        dislikes: 0,
        status: true,
        creationDate: Date.now().toString()
      });
      this.messageText = "";
    } else {
    }
  }

  DateConversion(dateStr: string) {
    return new Date(dateStr);
  }

  JustGiveDate() {
    var date = new Date();
    var conv = this.DateConversion(date.toString());
    return conv;
  }

  ngOnDestroy() {
    this.commentsSubscription.unsubscribe();
    this.logSubscription.unsubscribe();
    this.ttCreatorUserDataSub.unsubscribe();
    // this.ttAsigneeUserDataSub.unsubscribe();
  }
}
