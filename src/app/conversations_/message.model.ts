export class Message {
  constructor(
    public _id: string,
    public ticket_id: string,
    public createdBy: string,
    public content: string,
    public likes: number,
    public dislikes: number,
    public status: boolean
  ) {}
}
