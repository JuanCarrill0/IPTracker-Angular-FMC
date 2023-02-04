import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeoDataService } from '../geo-data.service';

@Component({
  selector: 'app-ip-tracker',
  templateUrl: './ip-tracker.component.html',
  styleUrls: ['./ip-tracker.component.scss']
})
export class IpTrackerComponent {

  data: any;
  
  /*Variables de información*/
  city:String = '';
  ip:String= '';
  country:String= ''
  timezone:String = '';
  isp:String = ''

  /*Variables de ubicación Geografica*/

  lat: number = 0;
  lng: number = 0;
  inputValue = '';
  
  constructor(private geoData:GeoDataService ,private http: HttpClient) { }


  
  onSubmit(){
    this.http.get('https://geo.ipify.org/api/v2/country,city?apiKey=at_9WAxrKoHWwaeHrYlzeReKcm0kqahg&ipAddress='+this.inputValue)
    .subscribe(data => {
      this.data = data;
      this.ip = this.data.ip;
      this.country = this.data.location.country;
      this.city = this.data.location.city;
      this.timezone = this.data.location.timezone;
      this.isp = this.data.isp;
      this.lat = this.data.location.lat;
      this.lng= this.data.location.lng;
      console.log(this.ip, this.country, this.city, this.timezone, this.isp);
      // Output: 8.8.8.8 US Mountain View -07:00 Google LLC
      console.log(this.lng,this.lat)
      this.geoData.updateData(this.lng,this.lat);
    });
  }
}
