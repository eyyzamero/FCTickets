import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ConversationsService {

  private _conversationsArray = new BehaviorSubject<Message[]>([]);

  get Messages() {
    return this._conversationsArray.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  getMessages(ticketId: string) {
    return this.httpClient.get<Message[]>(`http://localhost:4201/api/comments/${ticketId}` + '?numOfComments=15')
      .pipe(map(resData => {
        let messages = [];
        messages = resData;
        return messages;
      }),
      tap(messages => {
        this._conversationsArray.next(messages);
      })
      )
  }

  getMessage(messageId: string) {
    return this.httpClient.get<Message>(`http://localhost:4201/api/comments/${messageId}`);
  }

  newMessage(data: Message) {
    return this.httpClient.post<{comment_id: string}>('http://localhost:4201/api/comments/new', {
      ticket_id: data.ticket_id,
      createdBy: data.createdBy,
      content: data.content,
      likes: data.likes,
      dislikes: data.dislikes,
      status: data.status
    }).subscribe((resData) => {
      const newMessage = new Message(
        resData.comment_id,
        data.ticket_id,
        data.createdBy,
        data.content,
        data.likes,
        data.dislikes,
        data.status
      );
      this._conversationsArray.next(this._conversationsArray.value.concat(newMessage));
    });
  }

  updateMessage(messageId: string, data: Message) {
    return this.httpClient.put(
      `http://localhost:4201/api/comments/${messageId}`, {
        _id: messageId,
        ticket_id: data.ticket_id,
        createdBy: data.createdBy,
        content: data.content,
        likes: data.likes,
        dislikes: data.dislikes,
        status: data.status
      }
    ).pipe(map(resData => {
      let oldMessagesArray = [];
      oldMessagesArray = [...oldMessagesArray];
      return oldMessagesArray;
    }),
    tap(() => {
      const messageData = new Message(
        messageId,
        data.ticket_id,
        data.createdBy,
        data.content,
        data.likes,
        data.dislikes,
        data.status
      );
      this._conversationsArray.next(this._conversationsArray.value.concat(messageData));
    })
  )};

  hideMessage(messageId: string) {
    return this.httpClient.patch(`http://localhost:4201/api/comments/${messageId}`, {
      status: false
    });
  }
}
