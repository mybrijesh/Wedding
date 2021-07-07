import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data } from './FinalDBGuestList';

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
  drashtiGuest: boolean;
}

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  columnsDataName: string[] = ["firstName", "lastName","invitationCode",
   "invitedGuest","rsvpConfirmed", "modified",
  "invitedToSangeet","invitedToWedding",
  "invitedToReception","rsvpConfirmedForSangeet",
  "rsvpConfirmedForWedding","rsvpConfirmedForReception","kids","numOfKidsConfrimed"
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
    modified: true,
    drashtiGuest: false
  }]

  totalGuest:number = 0;
  totalSangeet: number = 0;
  totalWedding: number = 0;
  totalReception: number = 0;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.setCounts();
    // this.getGuestList();
    this.setData();
  }

  setData() {
    const temp = [];
    data.forEach(element => {
      const t: guestList = {
        id: element.id,
        invitationCode: element.invitationCode,
        firstName: element.firstname,
        lastName: element.lastname,
        invitedGuest: element.invitedGuest,
        invitedToSangeet: Boolean(element.invitedToSangeet),
        invitedToWedding: Boolean(element.invitedToWedding),
        invitedToReception: Boolean(element.invitedToReception),
        rsvpConfirmedForSangeet: element.rsvpConfirmedForSangeet,
        rsvpConfirmedForWedding: element.rsvpConfirmedForWedding,
        rsvpConfirmedForReception: element.rsvpConfirmedForReception,
        rsvpConfirmed: Boolean(element.rsvpConfirmed),
        kids: element.kids,
        numOfKidsConfrimed: element.numOfKidsConfrimed,
        modified: Boolean(element.modified),
        drashtiGuest: Boolean(element.drashtiGuest)
      }

      temp.push(t);
    });

    this.guestList = temp;
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
            modified: Boolean(data.modified),
            drashtiGuest: Boolean(data.drashtiGuest)
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

  getCountForColumn(column: string, drashtiGuest?: boolean, modified?: boolean): number {
    let count = 0;
    this.guestList.forEach(guest => {
      if(modified === undefined || modified === null ||
        modified === guest.modified){
          if(drashtiGuest === undefined || drashtiGuest === null || 
            guest.drashtiGuest === drashtiGuest){
            count = count + guest[column];
          }
      }
    })
    return count;
  }

  expanded(event) {
    // console.log(event);
    event.target.nextElementSibling.style.display = event.target.nextElementSibling.style.display === "block" ? "none" : "block";
  }

}
