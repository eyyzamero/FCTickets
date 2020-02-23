import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Log } from "../models/log.model";

@Injectable({ providedIn: "root" })
export class LogsService {
  private _logsArray = new BehaviorSubject<Log[]>([]);

  get Logs() {
    return this._logsArray.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  getLogs(ticket_id: string) {
    return this.httpClient
      .get<Log[]>(`http://localhost:4201/api/logs/${ticket_id}`)
      .pipe(
        map(resData => {
          let logArr = [];
          logArr = resData;
          return logArr;
        }),
        tap(logs => {
          this._logsArray.next(logs);
        })
      );
  }

  newLog(data: Log) {
    return this.httpClient
      .post<{ message: string; log_id: string }>(
        "http://localhost:4201/api/logs/new",
        {
          ticket_id: data.ticket_id,
          userID: data.userID,
          log_type: data.log_type,
          content: data.content,
          creationDate: data.creationDate
        }
      )
      .subscribe(resData => {
        const newLog: Log = {
          _id: resData.log_id,
          ticket_id: data.ticket_id,
          userID: data.userID,
          log_type: data.log_type,
          content: data.content,
          creationDate: data.creationDate
        };
        this._logsArray.next(this._logsArray.value.concat(newLog));
      });
  }

  deleteLog(logId: string) {
    return this.httpClient.delete(`http://localhost:4201/api/logs/${logId}`);
  }
}
