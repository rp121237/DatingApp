import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ListsResolver implements Resolve<User[]>{
    pageNumber = 1;
    pageSize = 5;
    likesParams = 'likers';

    constructor(private userService: UserService, private alertify: AlertifyService,
                private router: Router){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParams).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving Data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }

}
