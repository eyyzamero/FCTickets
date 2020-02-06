import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TicketService } from './ticket-service/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FCTickets';
  searchingMode = false;

  constructor(private dialog: MatDialog) {}

  TicketDialogOpen(userId: string, mode: string) {

    const dialogReference = this.dialog.open(NewTicketDialogComponent, {
      panelClass: 'TicketFormDialog',
      width: '80%',
      height: '90%',
      data: {id: userId, mode: mode}
    });
  }
}

@Component({
  selector: 'app-ticket-form-dialog',
  templateUrl: 'ticket-form/app-ticket-form-dialog.html',
  styleUrls: ['./ticket-form/app-ticket-form-dialog.css']
})
export class NewTicketDialogComponent {

  isLoading = true;
  mode = 'Create';
  ticket: FormGroup;
  public Editor = ClassicEditor;
  public editorText = '';
  @ViewChild('ticketDescription') myEditor: any;

  constructor(
    public dialogRef: MatDialogRef<NewTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _ticketService: TicketService) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.ticket = new FormGroup({
      'ticketCategory': new FormControl(null, {
        validators: [Validators.required]
      }),
      'ticketTitle': new FormControl(null, {
        validators: [Validators.required]
      }),
      'ticketLocation': new FormControl(null, {
        validators: [Validators.required]
      }),
      'ticketCode': new FormControl(null, {
        validators: [Validators.required]
      }),
      'ticketQuantity': new FormControl(null, {
        validators: [Validators.required]
      }),
      'ticketAssignedGroup': new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.isLoading = false;
  }

  onTicketSubmit() {
    if (this.ticket.invalid) {
      return;
    }
    if (this.mode === 'Create') {
      this._ticketService.newTicket({
          _id: null,
          category: this.ticket.value.ticketCategory,
          title: this.ticket.value.ticketTitle,
          location: this.ticket.value.ticketLocation,
          code: this.ticket.value.ticketCode,
          quantity: this.ticket.value.ticketQuantity,
          assignedGroup: this.ticket.value.ticketAssignedGroup,
          content: this.editorText
        }
      );
      this.ticket.reset();
      this.dialogRef.close();
    } else {

    }
  }
}
