import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invitation-detail',
  templateUrl: './invitation-detail.component.html',
  styleUrls: ['./invitation-detail.component.css']
})
export class InvitationDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  invitationCode: string;

  ngOnInit() {
    this.getInvitationCode();
  }

  getInvitationCode(): void {
    this.invitationCode = this.route.snapshot.paramMap.get('invitecode');
  }

}
