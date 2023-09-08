import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public dataStream$ = new Observable<any[]>((observer) => {
    this.http
      .get<any[]>('https://frontendteamfiles.blob.core.windows.net/exercises/vessels.json')
      .subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
  });

  public getDataStream(): Observable<any[]> {
    return this.dataStream$;
  } 
}
