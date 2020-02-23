import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketItemComponent } from "./ticket-item/ticket-item.component";
import { AuthGuard } from "./auth/auth-guard";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
  { path: "", component: TicketListComponent },
  {
    path: "ticket/:id",
    component: TicketItemComponent,
    canActivate: [AuthGuard]
  },
  { path: "search", component: SearchComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
