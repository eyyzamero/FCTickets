import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatBadgeModule } from "@angular/material/badge";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatSnackBarModule } from "@angular/material/snack-bar";

// import { Auth } from './user/user-auth.service';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent, NewTicketDialogComponent } from "./app.component";
import { TicketService } from "./ticket-service/ticket.service";
import { HttpClientModule } from "@angular/common/http";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketItemComponent } from "./ticket-item/ticket-item.component";
import { ConversationsService } from "./conversations_/conversation.service";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AuthService } from "./services/auth.service";
import { LogsService } from "./services/logs.service";
import { SearchComponent } from "./search/search.component";
import { SearchService } from "./search/search.service";
import { SettingsComponent } from "./settings/settings.component";

@NgModule({
  declarations: [
    AppComponent,
    NewTicketDialogComponent,
    TicketListComponent,
    TicketItemComponent,
    UserProfileComponent,
    SearchComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatBadgeModule,
    MatDividerModule,
    MatCardModule,
    MatProgressBarModule,
    CKEditorModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FlexLayoutModule,
    MatTabsModule,
    MatTableModule,
    MatSnackBarModule
  ],
  entryComponents: [NewTicketDialogComponent],
  providers: [
    TicketService,
    ConversationsService,
    AuthService,
    LogsService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
