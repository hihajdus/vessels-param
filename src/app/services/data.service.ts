import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public dataVessel$ = new Observable<any[]>((observer) => {
    this.http
      .get<any[]>('https://frontendteamfiles.blob.core.windows.net/exercises/vessels.json')
      .subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
  });

  public getDataVesselStream(): Observable<any[]> {
    return this.dataVessel$;
  } 

  public dataEmission$ = new Observable<any[]>((observer) => {
    this.http
      .get<any[]>('https://frontendteamfiles.blob.core.windows.net/exercises/emissions.json')
      .subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
  });

  public getDataEmissionStream(): Observable<any[]> {
    return this.dataEmission$;
  }


}
