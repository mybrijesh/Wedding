import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  invitationCodeSubmitted: boolean;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.invitationCodeSubmitted = false;
  }

  update(invitationCode: string) {
    console.log('update:');
    console.log(invitationCode);
    // this.invitationCode = 'abc123';
    this.http.get<{}>('http://localhost:8000/getInvitationDetail?invitationCode=' + invitationCode).subscribe((catsData: any) => {
      if(catsData){
        this.invitationCodeSubmitted = true;
      }
    });
  }
}
