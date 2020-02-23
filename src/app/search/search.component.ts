import { Component, OnInit, OnDestroy } from "@angular/core";
import { SearchService } from "./search.service";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";
import { Ticket } from "../ticket-service/ticket.model";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  searchSubscription: Subscription;
  searchingResultsArray: Ticket[];
  TT: Ticket;
  categorySelected;

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
    private _searchService: SearchService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.auth.isAuthenticated$) {
        this.searchSubscription = this._searchService.Results.subscribe(
          results => {
            this.searchingResultsArray = results;
          }
        );
      }
    }, 500);
  }

  searchingQueryRedirect(category: string, query: string) {
    const data = {
      category: category,
      query: query
    };
    this.isLoading = true;
    this._searchService.searchingQueryDeterminator(data).subscribe(resData => {
      this.TT = resData;
      this.categorySelected = data.category;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
