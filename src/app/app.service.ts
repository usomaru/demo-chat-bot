import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Subscription } from "rxjs";
import { ReturnDataModel, messageModel } from "./models/chat.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  OPEN_AI_URL = '';
  OPEN_AI_KEY = '';

  constructor(
    private readonly _httpClient: HttpClient
  ) {
  }

  postChat$(addMessage: string): Observable<ReturnDataModel> {
    const requestBody = {
      "messages": [
        {
          "role": "system",
          "content": "You are an AI assistant that helps people find information."
        },
        {
          "role": "user",
          "content": addMessage
        },
        {
          "role": "assistant",
          "content": ""
        }
      ],
      "temperature": 0.7,
      "top_p": 0.95,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "max_tokens": 300,
      "stop": null
    }
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'api-key': this.OPEN_AI_KEY  });
    return this._httpClient.post<ReturnDataModel>(this.OPEN_AI_URL, requestBody,  {headers : headers});
  }
}