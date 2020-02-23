import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TicketService } from "./ticket-service/ticket.service";
import { Ticket } from "./ticket-service/ticket.model";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "FCTickets";
  searchingMode = false;

  constructor(private dialog: MatDialog, public auth: AuthService) {}

  TicketDialogOpen(userId: string, mode: string, ticket_id?: string) {
    const dialogReference = this.dialog.open(NewTicketDialogComponent, {
      panelClass: "TicketFormDialog",
      width: "80%",
      height: "90%",
      data: { id: userId, mode: mode, ticket_id: ticket_id }
    });
  }
}

@Component({
  selector: "app-ticket-form-dialog",
  templateUrl: "ticket-form/app-ticket-form-dialog.html",
  styleUrls: ["./ticket-form/app-ticket-form-dialog.css"]
})
export class NewTicketDialogComponent {
  isLoading = true;
  mode = "Create";
  ticket: FormGroup;
  status;
  ticket_id = undefined;
  public editorText = "";
  public Editor = DecoupledEditor;
  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  constructor(
    public dialogRef: MatDialogRef<NewTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _ticketService: TicketService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.ticket = new FormGroup({
      ticketCategory: new FormControl(null, {
        validators: [Validators.required]
      }),
      ticketTitle: new FormControl(null, {
        validators: [Validators.required]
      }),
      ticketLocation: new FormControl(null, {
        validators: [Validators.required]
      }),
      ticketCode: new FormControl(null, {
        validators: [Validators.required]
      }),
      ticketQuantity: new FormControl(null, {
        validators: [Validators.required]
      }),
      ticketAssignedGroup: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    if (this.data.ticket_id !== undefined) {
      this.ticket_id = this.data.ticket_id;
      this.mode = "Update";
      let ticketData: Ticket;
      this.isLoading = true;
      this._ticketService.getTicket(this.data.ticket_id).subscribe(resData => {
        ticketData = resData;
        this.ticket.setValue({
          ticketCategory: ticketData.category,
          ticketTitle: ticketData.title,
          ticketLocation: ticketData.location,
          ticketCode: ticketData.code,
          ticketQuantity: ticketData.quantity,
          ticketAssignedGroup: ticketData.assignedGroup
        });
        this.editorText = ticketData.content;
        this.status = ticketData.status;
        this.isLoading = false;
      });
    }
    this.isLoading = false;
  }

  onTicketClose() {}

  onTicketSubmit() {
    if (this.ticket.invalid) {
      return;
    }
    if (this.mode === "Create") {
      this._ticketService.newTicket({
        _id: null,
        category: this.ticket.value.ticketCategory,
        title: this.ticket.value.ticketTitle,
        location: this.ticket.value.ticketLocation,
        code: this.ticket.value.ticketCode,
        quantity: this.ticket.value.ticketQuantity,
        assignedGroup: this.ticket.value.ticketAssignedGroup,
        content: this.editorText,
        status: true
      });
      this.ticket.reset();
      this.dialogRef.close();
    } else if (this.mode === "Update") {
      const ticketData = {
        _id: this.data.ticket_id,
        category: this.ticket.value.ticketCategory,
        title: this.ticket.value.ticketTitle,
        location: this.ticket.value.ticketLocation,
        code: this.ticket.value.ticketCode,
        quantity: this.ticket.value.ticketQuantity,
        assignedGroup: this.ticket.value.ticketAssignedGroup,
        content: this.editorText,
        status: true
      };
      this._ticketService
        .updateTicket(this.data.ticket_id, ticketData)
        .subscribe(() => {
          window.location.reload();
        });
      this.ticket.reset();
      this.dialogRef.close();
    }
  }
}
