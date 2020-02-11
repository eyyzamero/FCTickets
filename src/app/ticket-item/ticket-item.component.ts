import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { TicketService } from '../ticket-service/ticket.service';
import { Ticket } from '../ticket-service/ticket.model';
import { MatDialog } from '@angular/material/dialog';
import { NewTicketDialogComponent } from '../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConversationsService } from '../conversations_/conversation.service';
import { Message } from '../conversations_/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent {

  TT: Ticket
  isLoading = true;
  public Editor = DecoupledEditor;
  public onReady( editor ) {
  editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement(),
    );
  }

  // Conversations declarations
  public messageText = '';
  MM: Message[] = [];
  commentsSubscription: Subscription;

  constructor(
    public route: ActivatedRoute,
    public _ticketService: TicketService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    // Conversations setup
    private _conversationsService: ConversationsService
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this._ticketService.getTicket(paramMap.get('id')).subscribe(resData => {
          this.TT = resData;
          this.isLoading = false;
        })
      }
      this.commentsSubscription = this._conversationsService.Messages.subscribe(comments => {
        this.MM = comments;
      })
      // Conversation Setup
      this._conversationsService.getMessages(paramMap.get('id')).subscribe(resData => {
        this.isLoading = false;
      })
    })
  }

  TicketEdit(userId: string, mode: string, ticket_id?: string) {
    const dialogReference = this.dialog.open(NewTicketDialogComponent, {
      panelClass: 'TicketFormDialog',
      width: '80%',
      height: '90%',
      data: {id: userId, mode: mode, ticket_id: ticket_id}
    });
  }

  CloseTicket(ticketId: string) {
    this._ticketService.closeTicket(ticketId).subscribe(() => {
      this.openSnackBar('Ticket Successfully Closed!');
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null,  {
      duration: 3000,
    });
  }

  // Conversations Section
  newMessage(ticketId: string) {
    if (this.messageText.length !== 0) {
      this._conversationsService.newMessage({
        _id: null,
        ticket_id: ticketId,
        createdBy: 'eyyzam',
        content: this.messageText,
        likes: 0,
        dislikes: 0,
        status: true
      })
      this.messageText = '';
    } else {
      console.log('Cannot submit empty message')
    }
  }
}
