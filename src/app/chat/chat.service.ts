
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ChatComponent} from './chat.component'
import * as Rx from 'rxjs/Rx';


@Injectable()
export class WebsocketService {
  private socket = io(environment.socket);
  
  // currentDocument = this.socket.fromEvent<Document>('document');
  constructor(private http: HttpClient) { }


  joinRoom(data) {
    this.socket.emit('join', data);
    
  }

  sendMessage(data) {
 
    this.socket.emit('message', data);
  }

  messageViewed(){
    const observable = new Observable<{ ids?:any,chatId?:String}>(observer => {
      this.socket.on('message_viewed', (data) => {  
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String,view:any,sendAt:any,_id:any}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  newJoinee() {
    const observable = new Observable<{ chat:String}>(observer => {
      this.socket.on('new joinee', (data) => {
        
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

getAllConversations(data?:any){
  return this.http.post(environment.host + 'chat/',data,
  {observe: 'response'});
}

getAllChat(data?:any){
  return this.http.post(environment.host + 'chat/getConversation',data,
  {observe: 'response'});
}


removeListeners(){
  this.socket.removeAllListeners();
}
viewMessage(data){
  this.socket.emit('view_message',data);
}

recentChat(data?:any){
  return this.http.post(environment.host + 'chat/recentChat',data,
  {observe: 'response'});
}


unreadMsgCount(data?:any){
  return this.http.post(environment.host + 'chat/unreadMsgCount',data,
  {observe: 'response'});
}

}
