import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoDataService } from '../geo-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map | L.LayerGroup<any>;

  constructor(private geoData:GeoDataService) { }

  private initMap(): void {

    const myIcon = L.icon({
      iconUrl: '/assets/Icon.png',
      iconSize: [30, 40],
      iconAnchor: [3, 3],
      popupAnchor: [0, -2]
    
   })

    this.map = L.map('map', {
      center: [ this.geoData.lat, this.geoData.lng ],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    L.marker([this.geoData.lat, this.geoData.lng ], {icon: myIcon}).addTo(this.map);
    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
      this.initMap();
    // Escucha los cambios en el Subject
    this.geoData.dataUpdate.subscribe(data => {
      this.map.remove();
      this.initMap();
    });
    }
  }