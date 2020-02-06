export class Ticket {
  constructor(
    public _id: string,
    public category: string,
    public title: string,
    public location: string,
    public code: string,
    public quantity: number,
    public assignedGroup: string,
    public content: string
  ) {}
}
