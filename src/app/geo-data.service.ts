import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoDataService {

  lat:number = 39.8282;
  lng:number = -98.5795;
  constructor() {

   }

     // Crea un Subject
  dataUpdate = new Subject<{ lng: number, lat: number }>();

  updateData(lng: number, lat: number) {
    this.lng = lng;
    this.lat = lat;
    // Haz un next() en el Subject
    this.dataUpdate.next({ lng, lat });
  }
}
