import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface invitationCard {
  id: number;
  invitationCode: string;
  firstName: string;
  lastName: string;
  invitedGuest: number;
  invitedToSangeet: boolean;
  invitedToWedding: boolean;
  invitedToReception: boolean;
  rsvpConfirmedForSangeet: number;
  rsvpConfirmedForWedding: number;
  rsvpConfirmedForReception: number;
  rsvpConfirmed: boolean;
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
    id: 1,
    invitationCode: 'test',
    firstName: 'string',
    lastName: 'string',
    invitedGuest: 3,
    invitedToSangeet: true,
    invitedToWedding: true,
    invitedToReception: true,
    rsvpConfirmedForSangeet: 2,
    rsvpConfirmedForWedding: 2,
    rsvpConfirmedForReception: 1,
    rsvpConfirmed: false,
  } as invitationCard;

  guestCounts: Array<number>;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.invitationCodeSubmitted = false;
    this.guestCounts = Array(this.invitation.invitedGuest).fill(0).map((x, i) => i );
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

    this.http.get<{}>('http://52.12.154.173:9000/getInvitationDetail?invitationCode=' + invitationCode)
    .subscribe((data: any) => {
    // this.http.get<{}>('http://localhost:8000/getInvitationDetail?invitationCode=' + invitationCode).subscribe((data: any) => {
      if (data) {
        this.invitation.id = data.id;
        this.invitation.firstName = data.firstname;
        this.invitation.lastName = data.lastname;
        this.invitation.invitedGuest = data.invitedGuest;
        this.invitation.invitedToSangeet = data.invitedToSangeet;
        this.invitation.invitedToWedding = data.invitedToWedding;
        this.invitation.invitedToReception = data.invitedToReception;
        this.invitation.rsvpConfirmedForSangeet = data.rsvpConfirmedForSangeet;
        this.invitation.rsvpConfirmedForWedding = data.rsvpConfirmedForWedding;
        this.invitation.rsvpConfirmedForReception = data.rsvpConfirmedForReception;

        this.invitation.invitationCode = invitationCode;
        this.guestCounts = Array(this.invitation.invitedGuest).fill(0).map((x, i) => i );
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
      invitationCode: this.invitation.invitationCode,
      rsvpConfirmed: this.invitation.rsvpConfirmed ,
      rsvpConfirmedForSangeet: this.invitation.rsvpConfirmedForSangeet,
      rsvpConfirmedForWedding: this.invitation.rsvpConfirmedForWedding,
      rsvpConfirmedForReception: this.invitation.rsvpConfirmedForReception
    };
    this.http.post('http://52.12.154.173:9000/confirmrsvp', data).subscribe((response) => {
    // this.http.post('http://localhost:8000/confirmrsvp', data).subscribe((response) => {
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
