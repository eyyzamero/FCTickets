import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ticket } from "../ticket-service/ticket.model";
import { map, tap } from "rxjs/operators";

interface Query {
  category: string;
  query: string;
}

@Injectable({ providedIn: "root" })
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  private _resultsArray = new BehaviorSubject<Ticket[]>([]);

  get Results() {
    return this._resultsArray.asObservable();
  }

  searchingQueryDeterminator(data: Query) {
    switch (data.category) {
      case "TT_ID":
        {
          return this.httpClient
            .get<Ticket>(`http://localhost:4201/api/search/TID/${data.query}`)
            .pipe(
              map(resData => {
                let TT;
                TT = resData;
                return TT;
              }),
              tap(tickets => {
                this._resultsArray.next(tickets);
              })
            );
        }
        break;
      case "USER_ID":
        {
          console.log("UID");
        }
        break;
      case "GROUP_ID":
        {
          console.log("GID");
        }
        break;
      default: {
        console.log("Unknown sarching category");
      }
    }
  }
}
