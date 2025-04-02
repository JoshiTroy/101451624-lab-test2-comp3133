import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SpaceXMission {
  mission_name: string;
  launch_year: string;
  details: string;
  launch_success: boolean;
  rocket: {
    rocket_name: string;
    rocket_type: string;
    first_stage?: {
      cores?: Array<{
        land_success?: boolean;
      }>;
    };
  };
  launch_site: {
    site_name_long: string;
  };
  links: {
    mission_patch: string;
    mission_patch_small: string;
    article_link?: string;
    video_link?: string;
    wikipedia?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  getMissions(): Observable<SpaceXMission[]> {
    return this.http.get<SpaceXMission[]>(this.apiUrl);
  }

  getLaunchByYear(year: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?launch_year=${year}`);
  }

  getLaunchDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
