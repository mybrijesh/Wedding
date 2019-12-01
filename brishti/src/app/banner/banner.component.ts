import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  constructor() { }

  ngOnInit() {
  }

}
