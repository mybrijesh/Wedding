import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface guestList {
  id?: number;
  invitationCode?: string;
  firstName?: string;
  lastName?: string;
  invitedGuest?: number;
  invitedToSangeet?: boolean;
  invitedToWedding?: boolean;
  invitedToReception?: boolean;
  rsvpConfirmedForSangeet?: number;
  rsvpConfirmedForWedding?: number;
  rsvpConfirmedForReception?: number;
  rsvpConfirmed?: boolean;
  kids: number;
  numOfKidsConfrimed: number;
  modified: boolean;
}

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  columnsDataName: string[] = ["firstName", "lastName","invitationCode",
   "invitedGuest","rsvpConfirmed", 
  "invitedToSangeet","invitedToWedding",
  "invitedToReception","rsvpConfirmedForSangeet",
  "rsvpConfirmedForWedding","rsvpConfirmedForReception","kids","numOfKidsConfrimed", "modified"
    ]

  guestList: guestList[] = [{
    id: 1,
    invitationCode: "test",
    firstName: "brij",
    lastName: "test",
    invitedGuest: 3,
    invitedToSangeet: true,
    invitedToWedding: false,
    invitedToReception: true,
    rsvpConfirmedForSangeet: 3,
    rsvpConfirmedForWedding: 3,
    rsvpConfirmedForReception: 1,
    rsvpConfirmed: true,
    kids: 2,
    numOfKidsConfrimed: 2,
    modified: true
  }]

  totalGuest:number = 0;
  totalSangeet: number = 0;
  totalWedding: number = 0;
  totalReception: number = 0;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.setCounts();
    this.getGuestList();
  }

  private setCounts() {
    this.totalGuest = 0;
    this.totalSangeet = 0;
    this.totalWedding = 0;
    this.totalReception = 0;

    this.guestList.forEach(guest => {
      this.totalGuest += guest.invitedGuest;
      this.totalSangeet += guest.rsvpConfirmedForSangeet;
      this.totalWedding += guest.rsvpConfirmedForWedding;
      this.totalReception += guest.rsvpConfirmedForReception;
    })
  }

  getTotalGuestForTypeAndEvent(confirmed: boolean, type: string): number{
    let count = 0;

    this.guestList.forEach(guest => {
      if(guest.modified === confirmed){
        count += guest[type];
      }
    })

    return count;
  }

  getTotalGuestForEvent(confirmed): number{
    let count = 0;

    this.guestList.forEach(guest => {
      if(guest.modified === confirmed){
        count += 1;
      }
    })

    return count;
  }

  getValue(value: any): any {

    if(typeof value === "boolean"){
      return value ? "Yes" : "No";
    } 
    return value;
  }

  getGuestList() {
    this.http.get<{}>('http://54.244.108.112:9000/getGuestList').subscribe((records: any) => {
    // this.http.get<{}>('http://localhost:9000/getGuestList').subscribe((records: any) => {
      if (records) {

        this.guestList = [];

        records.forEach(data => {
          const guest: guestList = {
            id : data.id,
            firstName : data.firstname,
            lastName : data.lastname,
            invitedGuest : data.invitedGuest,
            invitedToSangeet : Boolean(data.invitedToSangeet),
            invitedToWedding : Boolean(data.invitedToWedding),
            invitedToReception : Boolean(data.invitedToReception),
            rsvpConfirmedForSangeet : data.rsvpConfirmedForSangeet,
            rsvpConfirmedForWedding : data.rsvpConfirmedForWedding,
            rsvpConfirmedForReception : data.rsvpConfirmedForReception,
            invitationCode : data.invitationCode,
            rsvpConfirmed: Boolean(data.rsvpConfirmed),
            kids: data.kids,
            numOfKidsConfrimed: data.numOfKidsConfrimed,
            modified: Boolean(data.modified)
          }
          if (guest.invitationCode !== 'brij123'){
            this.guestList.push(guest);
          }
          // this.guestList.push(guest);
        });

        this.guestList.sort((a,b) => {
          if(a.modified){
            return -1;
          }
          if(b.modified){
            return 1;
          }
          return 0;
        })

        this.setCounts();
      }
    });
  }

}
