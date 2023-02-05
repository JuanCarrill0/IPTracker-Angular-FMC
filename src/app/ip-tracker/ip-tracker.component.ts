import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeoDataService } from '../geo-data.service';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-ip-tracker',
  templateUrl: './ip-tracker.component.html',
  styleUrls: ['./ip-tracker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IpTrackerComponent implements OnInit {

  data: any;
  
  private API_KEY = '999c56f9e69bf6dde4a2aa2dfa753724d7cc40895f8da2e1c8983438';

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
  ipAddress = '';
  
  constructor(private geoData:GeoDataService ,private http: HttpClient) { }


  getIp(){
    this.http.get('https://api.ipify.org?format=json')
    return new Promise<void>((resolve) => {
      // Código para obtener la dirección IP
      this.http.get('https://api.ipify.org?format=json')
        .subscribe(data => {
          this.data = data;
          this.ipAddress = this.data.ip;
          resolve();
        });
    });
  }

  newInput(){
    this.ipAddress = this.inputValue;
  }

  onSubmit(){
    this.http.get('https://api.ipdata.co/'+this.ipAddress+'?api-key='+this.API_KEY)
    .subscribe(data => {
      this.data = data;
      this.ip = this.data.ip;
      /*Declaracion de variables obtenidas por la api*/
      this.country = this.data.country_name;
      this.city = this.data.city;
      this.lat = this.data.latitude;
      this.lng= this.data.longitude;
      this.timezone = this.data.time_zone.offset;
      this.isp = this.data.asn.name;
      /*Declaración de variables de longitud y latitud para el servicio */
      this.geoData.updateData(this.lng,this.lat);
    });
  }

  ngOnInit() {
    this.getIp().then(() => {
      this.onSubmit();
    });
  }
}
