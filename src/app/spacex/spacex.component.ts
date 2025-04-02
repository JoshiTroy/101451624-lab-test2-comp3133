import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface SpaceXMission {
  mission_name: string;
  launch_year: string;
  details: string;
  links: {
    mission_patch: string;
    article_link?: string;
    video_link?: string;
    wikipedia?: string;
  };
  launch_success?: boolean;
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  launch_site: {
    site_name_long: string;
  };
}

@Component({
  selector: 'app-spacex',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './spacex.component.html',
  styleUrl: './spacex.component.css'
})
export class SpacexComponent implements OnInit {
  missions: SpaceXMission[] = [];
  filteredMissions: SpaceXMission[] = [];
  availableYears: string[] = [];
  selectedYear: string = '';
  selectedLaunchSuccess: string = '';
  selectedMission: SpaceXMission | null = null;
  showDetails: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<SpaceXMission[]>('https://api.spacexdata.com/v3/launches')
      .subscribe({
        next: (data) => {
          this.missions = data;
          this.filteredMissions = data;
          this.availableYears = [...new Set(data.map(mission => mission.launch_year))].sort();
        },
        error: (error) => {
          console.error('Error fetching SpaceX missions:', error);
        }
      });
  }

  applyFilters() {
    this.filteredMissions = this.missions.filter(mission => {
      const yearMatch = !this.selectedYear || mission.launch_year === this.selectedYear;
      const successMatch = this.selectedLaunchSuccess === '' || 
        (this.selectedLaunchSuccess === 'success' && mission.launch_success) ||
        (this.selectedLaunchSuccess === 'failure' && mission.launch_success === false);
      return yearMatch && successMatch;
    });
  }

  resetFilters() {
    this.selectedYear = '';
    this.selectedLaunchSuccess = '';
    this.filteredMissions = this.missions;
  }

  showMissionDetails(mission: SpaceXMission) {
    this.selectedMission = mission;
    this.showDetails = true;
  }

  closeDetails() {
    this.showDetails = false;
    this.selectedMission = null;
  }
}
