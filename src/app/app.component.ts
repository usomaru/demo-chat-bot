import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { messageModel } from './models/chat.model';
import { AppQuery } from './app.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-chat-bot';

  constructor(
    private readonly query: AppQuery
  ){}

  displayedColumns: string[] = ['role', 'content'];
  inputMessage = new FormControl('', [Validators.required]);
  chatData: messageModel[] = [];

  onclick(): void {
    this.sendMessage();
  }

  onKeyDown(): void {
    this.sendMessage();
}

sendMessage(): void {
  const message = this.inputMessage.value !== null? this.inputMessage.value : '';
  this.chatData.push(
    {
      content: message,
      role: 'user'
    }
  )
  this.query.postChatData(this.chatData);
  this.query.chatData$.subscribe(x => {
    this.chatData = x;
  })
  this.inputMessage.setValue('');
}
}
