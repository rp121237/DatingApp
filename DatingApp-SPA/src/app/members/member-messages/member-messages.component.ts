import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/Message';
import { UserService } from 'src/app/_service/user.service';
import { AuthService } from 'src/app/_service/auth.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input()  recipientId: number;
  messages: Message[];
  live = true;
  newMessage: any = {};

  constructor(private userService: UserService, private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      //  .pipe(
      //    tap(message => {
      //      // tslint:disable-next-line: prefer-for-of
      //      for (let index = 0; index < this.messages.length; index++) {
      //        if (this.messages[index].isRead === String(false) && this.messages[index].recipientId === currentUserId) {
      //          this.userService.markAsRead(currentUserId, this.messages[index].id);
      //        }
      //      }
      //    })
      //  )
        .subscribe((messages) => {
          this.messages = messages;
        }, error => {
          this.alertify.error(error);
        });
  }

  sendMessage(){
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}
