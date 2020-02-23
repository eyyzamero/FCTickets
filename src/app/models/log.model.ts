export class Log {
  constructor(
    public _id: string,
    public ticket_id: string,
    public userID: string,
    public log_type: string,
    public content: string,
    public creationDate: string
  ) {}
}
