import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AppService } from "./app.service";
import { messageModel } from "./models/chat.model";

@Injectable({
  providedIn: 'root'
})

export class AppQuery {

  constructor(
    private readonly service: AppService,
  ) { }

  private readonly _chatData = new BehaviorSubject<messageModel[]>([]);
  public get chatData$(): Observable<messageModel[]> {
    return this._chatData.asObservable();
  }

  public postChatData(chatData: messageModel[]): void {
    this._chatData.next(chatData);
    // オウム機能
    // // チャットっぽくするためにわざとsetTimeoutしてるだけ
    // setTimeout(() => {
    //   chatData.push(
    //     {
    //       content: chatData[chatData.length - 1].content,
    //       role: 'assistant'
    //     }
    //   )
    //   this._chatData.next(chatData);
    // }, 1500);
    // chatGPT
    this.service.postChat$(chatData[chatData.length - 1].content).subscribe(x => {
      const repMessage = x.choices[0].message.content;
      chatData.push(
        {
          content: repMessage,
          role: 'assistant'
        }
      )
      this._chatData.next(chatData);
    })
  }
}