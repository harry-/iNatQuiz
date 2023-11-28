import { Injectable } from '@angular/core';
import { Observation } from './inaturalist.interface';

@Injectable({
  providedIn: 'root'
})
export class InatApiService {

  observations!: Observation[];
  async loadObservations(): Promise<Observation[]> {

    const response = await fetch('https://api.inaturalist.org/v1/observations?identified=true&order=desc&order_by=created_at');
    const data = await response.json() ?? {};
    const observations: Observation[] = data.results ?? []

    for (let obs of observations) {
      if (obs.photos) {
        for (let photo of obs.photos) {
          photo.url = photo.url.replace('square', 'medium')
        }
      }
    }

    this.observations = observations
    return observations

  }
}
