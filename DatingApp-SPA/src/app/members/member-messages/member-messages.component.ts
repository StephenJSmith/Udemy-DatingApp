import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/message';
import { UserService } from '../../_services/user.service';
import { AuthGuard } from '../../_guards/auth.guard';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedTokenId;
    this.userService.getMessageThread(this.authService.decodedTokenId, this.recipientId)
      .pipe(
        tap((messages: Message[]) => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            if (!message.isRead && message.recipientId === currentUserId) {
              this.userService.markAsRead(currentUserId, message.id);
            }
          }
        })
      )
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.alertify.error(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedTokenId,
        this.newMessage).subscribe((message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = '';
        }, error => this.alertify.error(error));
  }

}
