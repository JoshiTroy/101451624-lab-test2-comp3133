import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceXMission } from '../../services/spacex.service';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mission-details-container" *ngIf="mission">
      <div class="header">
        <button class="back-button" (click)="onBack()">← Back to List</button>
        <h1 class="title">SpaceX Mission Details</h1>
      </div>

      <div class="content">
        <div class="mission-patch">
          <img [src]="mission.links.mission_patch" [alt]="mission.mission_name + ' patch'">
        </div>

        <div class="details">
          <section>
            <h2 class="section-title mission-title">Mission - {{ mission.mission_name }}</h2>
            <div class="info-row">
              <label>Name:</label>
              <span>{{ mission.mission_name }}</span>
            </div>
            <div class="info-row">
              <label>Launch Year:</label>
              <span>{{ mission.launch_year }}</span>
            </div>
          </section>

          <section>
            <h2 class="section-title">Rocket</h2>
            <div class="info-row">
              <label>Name:</label>
              <span>{{ mission.rocket.rocket_name }}</span>
            </div>
            <div class="info-row">
              <label>Type:</label>
              <span>{{ mission.rocket.rocket_type }}</span>
            </div>
          </section>

          <section>
            <h2 class="section-title">Launch Site</h2>
            <div class="info-row">
              <label>Name:</label>
              <span>{{ mission.launch_site.site_name_long }}</span>
            </div>
          </section>

          <section>
            <h2 class="section-title">Launch Details</h2>
            <p class="details-text">{{ mission.details || 'No details available' }}</p>
          </section>

          <section>
            <h2 class="section-title">More Info on Launch Details</h2>
            <div class="info-links">
              <a *ngIf="mission.links.article_link" 
                 [href]="mission.links.article_link" 
                 target="_blank"
                 class="link-icon article-icon"
                 title="Read Article">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </a>
              <a *ngIf="mission.links.video_link" 
                 [href]="mission.links.video_link" 
                 target="_blank"
                 class="link-icon video-icon"
                 title="Watch Video">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 9.5v-6l6 3-6 3z"/>
                </svg>
              </a>
              <a *ngIf="mission.links.wikipedia" 
                 [href]="mission.links.wikipedia" 
                 target="_blank"
                 class="link-icon wiki-icon"
                 title="View on Wikipedia">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .084-.103.14-.288.166-.314.045-.574.139-.781.284-.2.146-.161.315-.11.5.24.858 4.235 9.269 4.629 10.13.159.358.292.38.374 0 .162-.418 3.556-7.63 3.556-7.63.111-.241.043-.438-.168-.591-.231-.168-.836-.267-1.26-.313-.279-.028-.336-.085-.336-.17v-.425l.039-.045h4.979l.039.045v.434c0 .084-.123.145-.324.171-.508.066-1.036.261-1.565.833-.574.592-6.164 12.592-6.164 12.592z"/>
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mission-details-container {
      background-color: #faf0e6;
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: white;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
    }

    .back-button {
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      font-size: 16px;
      padding: 0;
      margin-bottom: 10px;
    }

    .title {
      margin: 0;
      font-size: 24px;
      color: #333;
    }

    .content {
      display: flex;
      gap: 30px;
      padding: 20px;
    }

    .mission-patch {
      flex: 0 0 300px;
    }

    .mission-patch img {
      width: 100%;
      height: auto;
    }

    .details {
      flex: 1;
    }

    section {
      margin-bottom: 25px;
    }

    .section-title {
      color: #ff6b6b;
      font-size: 18px;
      margin: 0 0 10px 0;
      font-weight: normal;
    }

    .mission-title {
      font-size: 20px;
    }

    .info-row {
      display: flex;
      margin-bottom: 5px;
    }

    .info-row label {
      width: 120px;
      color: #666;
    }

    .details-text {
      line-height: 1.6;
      color: #333;
      margin: 0;
    }

    .info-links {
      display: flex;
      gap: 15px;
    }

    .link-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: #fff;
      border-radius: 8px;
      color: #666;
      transition: all 0.2s;
    }

    .link-icon:hover {
      color: #333;
      transform: translateY(-2px);
    }

    .article-icon:hover {
      color: #2196f3;
    }

    .video-icon:hover {
      color: #f44336;
    }

    .wiki-icon:hover {
      color: #333;
    }
  `]
})
export class MissiondetailsComponent {
  @Input() mission: SpaceXMission | null = null;
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
