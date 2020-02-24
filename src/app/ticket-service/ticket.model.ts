export class Ticket {
  constructor(
    public _id: string,
    public severity: number,
    public category: string,
    public title: string,
    public location: string,
    public code: string,
    public quantity: number,
    public assignedGroup: string,
    public content: string,
    public userID: string,
    public asigneeID: string,
    public HPOE: boolean,
    public status: boolean
  ) {}
}
