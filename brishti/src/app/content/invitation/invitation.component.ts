import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface invitationCard {
  firstName: string;
  lastName: string;
  invitationCode: string;
  email: string;
  rsvpConfirmed: boolean;
  phone: string;
  numOfGuest: number;
  confirmedGuest: number;
}

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  invitationCodeSubmitted: boolean;

  invitation: invitationCard = {
    firstName: 'Brijesh',
    lastName: 'Patel',
    email: 'test@test.com',
    phone: '9999',
    invitationCode: 'test',
    numOfGuest: 3,
    rsvpConfirmed: true,
    confirmedGuest: 0,
  } as invitationCard;

  guestCounts: Array<number>;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.invitationCodeSubmitted = false;
    this.guestCounts = Array(this.invitation.numOfGuest).fill(0).map((x, i) => i );
  }

  update(invitationCode: string) {
    this.http.get<{}>('http://localhost:8000/getInvitationDetail?invitationCode=' + invitationCode).subscribe((data: any) => {
      if (data) {

        this.invitation.firstName = data.firstname;
        this.invitation.lastName = data.lastname;
        this.invitation.email = data.email;
        this.invitation.invitationCode = invitationCode;
        this.invitation.phone = data.phone;
        this.invitation.numOfGuest = data.numOfGuest;
        this.guestCounts = Array(this.invitation.numOfGuest).fill(0).map((x, i) => i );
        this.invitationCodeSubmitted = true;
      }
    });
  }

  updateRsvp(rsvp: boolean) {
    this.invitation.rsvpConfirmed = rsvp;
    if (rsvp) {
      console.log('rsvp accepted');
    } else {
      console.log('rsvp regret');
    }
    console.log(this.invitation);
    const data = {
      email: this.invitation.email,
      phone: this.invitation.phone,
      numOfGuest: this.invitation.confirmedGuest,
      rsvpConfirmed: this.invitation.rsvpConfirmed,
      invitationCode: this.invitation.invitationCode
    };
    this.http.post('http://localhost:8000/confirmrsvp', data).subscribe((response) => {
      if (response) {
        console.log('RSVP Confirmed: ' + response);
      } else {
        console.log('Could not update rsvp');
      }
    });
  }
}
