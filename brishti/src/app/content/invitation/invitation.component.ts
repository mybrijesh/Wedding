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

  validInvitationCode: boolean;

  dbConfirmation: boolean;

  closeMessage: string;

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
    this.dbConfirmation = false;
    this.closeMessage = 'You will be missed.';
    this.validInvitationCode = true;
  }

  update(invitationCode: string) {
    console.log('getInvitationDetail: ' + invitationCode);
    if (invitationCode.length === 0) {
      this.validInvitationCode = false;
      return;
    }
    this.http.get<{}>('http://localhost:8000/getInvitationDetail?invitationCode=' + invitationCode).subscribe((data: any) => {
      if (data) {
        this.invitation.firstName = data.firstname;
        this.invitation.lastName = data.lastname;
        this.invitation.email = data.email;
        this.invitation.invitationCode = invitationCode;
        this.invitation.phone = data.phone;
        this.invitation.numOfGuest = data.numOfGuest;
        this.invitation.confirmedGuest = this.invitation.numOfGuest;
        this.guestCounts = Array(this.invitation.numOfGuest).fill(0).map((x, i) => i );
        this.invitationCodeSubmitted = true;
        this.validInvitationCode = true;
      } else {
        this.validInvitationCode = false;
      }
    });
  }

  updateRsvp(rsvp: boolean) {
    this.invitation.rsvpConfirmed = rsvp;
    if (rsvp) {
      // console.log('rsvp accepted');
      this.closeMessage = 'We are excited to have you at our wedding.';
    } else {
      // console.log('rsvp regret');
      this.closeMessage = 'You will be missed.';
    }
    const data = {
      email: this.invitation.email,
      phone: this.invitation.phone,
      numOfGuest: this.invitation.confirmedGuest,
      rsvpConfirmed: this.invitation.rsvpConfirmed,
      invitationCode: this.invitation.invitationCode
    };
    this.http.post('http://localhost:8000/confirmrsvp', data).subscribe((response) => {
      if (response) {
        console.log('RSVP Updated: ' + response);
      } else {
        console.log('Could not update rsvp');
      }
      this.dbConfirmation = true;
    });
  }

  closeRsvp(): void {
    this.dbConfirmation = false;
    this.invitationCodeSubmitted = false;
  }

}
