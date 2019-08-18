import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    const userId = this.authService.decodedTokenId;

    return this.userService.getMessages(userId, this.pageNumber,
        this.pageSize, this.messageContainer)
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving messages');
          this.router.navigate(['/home']);

          return of(null);
        })
      );
  }
}
