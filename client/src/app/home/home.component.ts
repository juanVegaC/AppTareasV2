import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: false
})
export class HomeComponent implements OnInit,AfterViewInit {

  ngOnInit() {
    //console.log("HomeComponent-ngOnInit");
	}

  ngAfterViewInit(): void {
    //console.log("HomeComponent-ngAfterViewInit");
  }
}
