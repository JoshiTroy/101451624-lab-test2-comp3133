import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionlistComponent } from './components/missionlist/missionlist.component';
import { MissionfilterComponent } from './components/missionfilter/missionfilter.component';
import { MissiondetailsComponent } from './components/missiondetails/missiondetails.component';
import { SpaceXMission, SpacexService } from './services/spacex.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MissionlistComponent, MissionfilterComponent, MissiondetailsComponent],
  template: `
    <div class="container">
      <app-missionfilter 
        (filterChange)="onFilterChange($event)">
      </app-missionfilter>
      
      <div class="content" [class.with-details]="selectedMission">
        <div class="main-content" [class.hidden]="selectedMission">
          <app-missionlist 
            [missions]="filteredMissions" 
            (missionSelect)="onMissionSelect($event)"
            class="list-section">
          </app-missionlist>
        </div>
        <app-missiondetails 
          *ngIf="selectedMission" 
          [mission]="selectedMission"
          (back)="onBack()"
          class="details-view">
        </app-missiondetails>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .content {
      display: flex;
      gap: 20px;
      width: 100%;
    }

    .main-content {
      width: 100%;
    }

    .main-content.hidden {
      display: none;
    }

    .list-section {
      width: 100%;
    }

    .details-view {
      width: 100%;
    }

    .with-details .main-content {
      display: none;
    }
  `]
})
export class AppComponent implements OnInit {
  allMissions: SpaceXMission[] = [];
  filteredMissions: SpaceXMission[] = [];
  selectedMission: SpaceXMission | null = null;

  constructor(private spacexService: SpacexService) {}

  ngOnInit() {
    this.spacexService.getMissions().subscribe(missions => {
      this.allMissions = missions;
      this.filteredMissions = missions;
    });
  }

  onFilterChange(filters: { 
    year: string | null; 
    launchSuccess: boolean | null;
  }) {
    this.filteredMissions = this.allMissions.filter(mission => {
      const yearMatch = !filters.year || mission.launch_year === filters.year;
      const launchMatch = filters.launchSuccess === null || mission.launch_success === filters.launchSuccess;

      return yearMatch && launchMatch;
    });
  }

  onMissionSelect(mission: SpaceXMission) {
    this.selectedMission = mission;
  }

  onBack() {
    this.selectedMission = null;
  }
}
