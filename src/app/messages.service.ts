import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  // messages -
  messages: string[] = [];

  constructor() {}

  // add -
  add(message: string) {
    this.messages.push(message);
  }
  // clear -
  clear() {
    this.messages = [];
  }
}
