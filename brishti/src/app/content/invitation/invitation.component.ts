import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  invitationCode: string;
  invitationCodeSubmitted: boolean;

  constructor() {}
  ngOnInit() {
    this.invitationCode = "";
    this.invitationCodeSubmitted = false;
  }

  update(){
    this.invitationCodeSubmitted = true;
  }

}
