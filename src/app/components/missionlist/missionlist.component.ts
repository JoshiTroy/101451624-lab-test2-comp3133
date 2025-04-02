import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceXMission } from '../../services/spacex.service';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="missions-container">
      <h1 class="list-title">SpaceX Mission Launch List</h1>
      <div class="mission-list">
        <div class="mission-item" *ngFor="let mission of missions" (click)="onMissionSelect(mission)">
          <div class="mission-content">
            <div class="mission-logo">
              <img 
                [src]="mission.links.mission_patch_small || mission.links.mission_patch || 'assets/images/default-mission-patch.svg'"
                [alt]="mission.mission_name + ' patch'"
                (error)="onImageError($event)">
            </div>
            <div class="mission-info">
              <div class="mission-header">
                <h2 class="mission-name">{{ mission.mission_name }}</h2>
                <span class="mission-year">{{ mission.launch_year }}</span>
                <span class="status-badge" [class.success]="mission.launch_success" [class.failed]="!mission.launch_success">
                  {{ mission.launch_success ? 'Successful' : 'Failed' }}
                </span>
              </div>
              <p class="mission-details">{{ mission.details || 'No details available' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .missions-container {
      width: 100%;
    }

    .list-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      padding: 10px;
      border-bottom: 2px solid #ddd;
    }

    .mission-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .mission-item {
      background-color: #e3f2fd;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .mission-item:hover {
      background-color: #bbdefb;
    }

    .mission-content {
      display: flex;
      padding: 15px;
      gap: 15px;
      align-items: flex-start;
    }

    .mission-logo {
      width: 50px;
      height: 50px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 4px;
      padding: 4px;
    }

    .mission-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .mission-info {
      flex: 1;
    }

    .mission-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 5px;
    }

    .mission-name {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }

    .mission-year {
      color: #666;
      font-size: 14px;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.success {
      background-color: #4caf50;
      color: white;
    }

    .status-badge.failed {
      background-color: #f44336;
      color: white;
    }

    .mission-details {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
      color: #333;
    }
  `]
})
export class MissionlistComponent {
  @Input() missions: SpaceXMission[] = [];
  @Output() missionSelect = new EventEmitter<SpaceXMission>();

  onMissionSelect(mission: SpaceXMission) {
    this.missionSelect.emit(mission);
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/default-mission-patch.svg';
  }
}
