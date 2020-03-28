import { Component, OnInit, Renderer2, OnDestroy, Injector, ViewChild, ElementRef, HostListener,ChangeDetectorRef, NgZone, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WebsocketService } from './chat.service';

import { Observable, Subscription } from 'rxjs';

import * as io from 'socket.io-client';
import { CookieService } from '@ngx-toolkit/cookie';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;
  // @HostListener('scroll', ['$event']) 
  public participants: any = [];
  public chatId: any;
  public receiverId: any;
  public receiverRole: any;
  public userData: any;
  public paramObj = {};
  public allChats: any = [];
  public currentPicUserId: any;
  public currentProfilePic: any;
  public currentParticipantRole: any;
  public currentParticipantRoleName: any;
  public username: any;
  public email: any;
  public currentChatId: any;
  public currentChatRecepient: any;
  public message: any;
  public messageArray: Array<{ user: any, message: any }> = [];
  public isTyping = false;
  public timeout: any;
  public isNewDate = false;
  public participantsEmpty: any;
  public flagValid: any = false;
  socket: SocketIOClient.Socket;
  container: HTMLElement;
  documents: Observable<string[]>;
  currentDoc: any;
  private _docSub: Subscription;
  public isMobile: any = false;
  public unreadMsgCount: any;
  public timerSubscription1: Subscription;
  public selectedIndex: number = -1;
  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebsocketService, private cd: ChangeDetectorRef,
    private router: Router, private renderer: Renderer2,
    private injector: Injector, private cookieService: CookieService, private zone: NgZone
  ) {
    this.renderer.addClass(document.body, 'chat');
    this.socket = io.connect();
    this.userData = JSON.parse(cookieService.getItem('_dtl'))
    this.webSocketService.newMessageReceived().subscribe(data => {
     if (this.chatId === data['chatId']) {
        if (this.receiverId === data.user) {
          this.allChats.push(data);
          this.scrollToBottom();
          this.webSocketService.viewMessage({ chatId: this.chatId, ids: [data._id] })
          this.isTyping = false;
         } else {
          this.allChats.push(data);
           this.scrollToBottom();
          this.isTyping = false;
         }
      } else {
        const partiIndex = this.participants.findIndex((obj => obj._id === data["chatId"]))
        this.participants[partiIndex]["total"] = this.participants[partiIndex]["total"] + 1;
      }
   });
    this.webSocketService.messageViewed().subscribe(data => {
     const idArray = data['ids'];
      if (this.chatId === data.chatId) {
        for (let i = 0; i < idArray.length; i++) {
          const objIndex = this.allChats.findIndex((obj => obj._id === idArray[i]));
         this.allChats[objIndex].view = true;
        }
      };
    })
    this.webSocketService.receivedTyping().subscribe(bool => {
      if (this.chatId === bool['data']['chatId']) {
        if (this.receiverId === bool['data']['user']) {
          this.isTyping = bool.isTyping;
         }
      }
    });

    this.webSocketService.newJoinee().subscribe(async (data) => {
      this.chatId = data.chat;
     await this.getUserConversations(this.chatId)
      if (this.isMobile && !this.flagValid) {
        this.mobileMode();
      }
      if (this.isMobile && this.flagValid) {
        const backIcon = document.getElementById('backIcon');
        backIcon.classList.remove('d-none');
      }
      if (this.flagValid) {
        this.flagValid = false;
      }

    });
  }

  // scrollHandler(event) {
  //   console.debug("Scroll Event",event);
  // }
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
     if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  async ngOnInit() {
   this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
    this.receiverId = await this.route.snapshot.paramMap.get('userId');
    this.receiverRole = await this.route.snapshot.paramMap.get('role');
   
    await this.getUserConversations();
    this.normalMode();
    this.scrollToBottom();
   
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();

  }
  

  scrollToBottom(): void {
    if (this.myScrollContainer && this.myScrollContainer.nativeElement) {
      window.scrollTo({ left: 0, top: this.myScrollContainer.nativeElement.scrollHeight, behavior: "smooth" });
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
  }
  public joinRoom(recId) {
    this.webSocketService.joinRoom({ user: this.userData['_id'], userRole: this.userData['lg_role'], recepient: recId.id, recepientRole: recId.role });
    this.receiverId = recId.id
    }
  public onBack() {
    this.normalMode();
  }

  public async  getUserConversations(chatId?) {
     this.participants = [];
    const chatService = this.injector.get(WebsocketService);
    const obj = {
      role: this.userData['lg_role']
    };

    await chatService.getAllConversations(obj).subscribe(async (response) => {

      const data = response['body']['data'];
       if (data['success'] === true) {
       this.participants = data['data'];
        if (this.participants.length === 0) {
          this.participantsEmpty = true;
        } else {
          this.participantsEmpty = false;
         }
        if (chatId) {
          await this.getChat(chatId, this.participants)
        }

        if (this.receiverId !== this.userData['_id']) {
         if (this.participants) {
            const objIndex = await this.participants.findIndex((obj => obj['_id'] === this.receiverId));
            if (objIndex !== -1) {
              await this.getChat(this.participants[objIndex]['_id'], this.participants);
            } else {
             await this.webSocketService.joinRoom({ user: this.userData['_id'], userRole: this.userData['lg_role'], recepient: this.receiverId, recepientRole: parseInt(this.receiverRole) });
            }
          } else {
            await this.webSocketService.joinRoom({ user: this.userData['_id'], userRole: this.userData['lg_role'], recepient: this.receiverId, recepientRole: parseInt(this.receiverRole) });

          }
        } else {
          this.flagValid = true
          await this.recentChat();
        }
      } else {
        return false;
      }
    }, (err) => {
      console.error(err);
      return false;
    })
  }

  public async getChat(chatid, participantsList,index?:number) {
    
     

    this.paramObj['chatId'] = chatid;
    this.chatId = chatid;
   
    this.selectedIndex = index;
    this.username = '';
    if (participantsList && participantsList.length > 0) {
      const partiIndex = participantsList.findIndex((obj => obj._id === chatid))
      // this.participants[partiIndex]['total'] = null;
      // this.participants[partiIndex]['total'] = 0;
      this.currentPicUserId = null;
      this.currentProfilePic = null;
      this.currentParticipantRole = 0;
      this.currentParticipantRoleName = null;
      participantsList.forEach(element => {

        this.currentParticipantRole = 1;
      });
    } else {

    }
    this.allChats = [];
    let chatService = this.injector.get(WebsocketService);
    await chatService.getAllChat(this.paramObj).subscribe((res) => {
      if (res.body['data']['success'] === true && res.body['data'] && res.body['data']['data'] && res.body['data']['data'].length ) {
      
        const data = res.body['data']['data'];
        const arr = data;
        if (this.isMobile) {
          this.mobileMode();
        }
      if (arr[0]._id != this.userData['_id']) {

          if (arr[0].lastName) { this.username = arr[0].firstName + ' ' + arr[0].lastName; } else {
            this.username = arr[0].firstName;
          }
        } else {
          if (arr[1].lastName) { this.username = arr[1].firstName + ' ' + arr[1].lastName; } else {
            this.username = arr[1].firstName;
          }
        }
        if (data &&   data['messages'] && data['messages'].length > 0) {
          this.allChats = data['messages'];
          this.scrollToBottom();
          const recId = this.receiverId
          const viewFalseId = this.allChats.filter(function (e) {
            return e.view === false && e.user === recId;
          });
          if (viewFalseId.length > 0) {
            const resultId = viewFalseId.map(a => a._id);
            const obj = {
              chatId: chatid,
              ids: resultId
            }
            this.webSocketService.viewMessage(obj)
            this.scrollToBottom();
          }
        }
        this.scrollToBottom();
      }

    }, (err) => {
      console.error(err);
      return false;
    });
  }
async  sendMessage() {
    
    if(this.message &&  this.message.trim().length > 0   )
    {  
      this.webSocketService.sendMessage({ chatId: this.chatId, user: this.userData['_id'], message: this.message, view: false, sendAt: Date.now() });
      
      const partiIndex = this.participants.findIndex((obj => obj._id === this.chatId))
      this.message = '';
      if(partiIndex !== 0)
     { this.participants.push(...this.participants.splice(0,partiIndex));
    this.selectedIndex=0}
     await this.scrollToBottom();
    }
   
  }
  typing() {
    this.webSocketService.typing({ chatId: this.chatId, user: this.userData['_id'], message: this.message });
  }




  noTyping() {
    this.isTyping = false;
    this.webSocketService.typing({ chatId: this.chatId, user: this.userData['_id'], message: this.message, typing: false });

  }
  ngOnDestroy(): void {
    if (this.timerSubscription1) {
      this.timerSubscription1.unsubscribe();
    }
    this.webSocketService.removeListeners();
    this.socket.disconnect();
  }

  public checkDate(dt1, d2) {
    if (d2) {
      const dt2 = d2['sendAt'];
      const a = new Date(dt1).getDate();
      const b = new Date(dt2).getDate();
      if (a != b) {
        this.isNewDate = true;
        var today = new Date().setHours(0, 0, 0, 0);
        var thatDay = new Date(dt1).setHours(0, 0, 0, 0);
        if (today === thatDay) { return "Today"; }
        return "true";
      }
      else {
        this.isNewDate = false;
        return "false";
      }

    } else {
      this.isNewDate = true;
      return "true";
    }

  }
  public recentChat() {
    const obj = {
      role: 1
    };
    let chatService = this.injector.get(WebsocketService);
    chatService.recentChat(obj).subscribe((result) => {
       if (result['status'] === 200 && result['body']['data'].length > 0) {
        const data = result['body']['data'][0];
        this.joinRoom(data['_id']);
        this.getChat(data['chatId'], this.participants);
      }
    }, (error) => {
      console.error('error', error);

    })
  }

  public mobileMode() {
    const listPanel = document.getElementById('listPanel');
    listPanel.classList.add('d-none');
    const chatPanel = document.getElementById('chatPanel');
    chatPanel.classList.remove('d-none');
    const backIcon = document.getElementById('backIcon');
    backIcon.classList.remove('d-none');
  }
  public normalMode() {
    const listPanel = document.getElementById('listPanel');
    if (listPanel) { listPanel.classList.remove('d-none'); }

    const backIcon = document.getElementById('backIcon');
    if (backIcon) { backIcon.classList.add('d-none'); }
    const chatPanel = document.getElementById('chatPanel');
    if (chatPanel) { chatPanel.classList.add('d-none'); }
  }


}

