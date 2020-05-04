import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;

  @HostListener('window:beforeUnload', ['$event'])
  unloadNotification($event: any){
    if (this.editForm.dirty){
      $event.returnValue = true;
    }
  }


  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private auth: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data =>  {
      this.user = data['user'];
    });
  }

  updateUser(){
    this.userService.updateUser(this.auth.decodedToken.nameid, this.user).subscribe(() => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, (error) => {
      this.alertify.error(error);
    });

  }


}
