import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-spacex',
  templateUrl: './spacex.component.html',
  styleUrls: ['./spacex.component.css']
})
export class SpacexComponent implements OnInit {
  missions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://api.spacexdata.com/v3/launches')
      .subscribe(data => {
        this.missions = data.slice(0, 10); // Show first 10 missions
      });
  }
}
