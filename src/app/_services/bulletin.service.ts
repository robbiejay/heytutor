import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Bulletin } from '../_models/bulletin.model';


@Injectable({
  providedIn: 'root'
})
export class BulletinService {
  private bulletins: Bulletin[] = [];
  private bulletinsUpdated = new Subject<Bulletin[]>();

  constructor(private http: HttpClient) { }

getBulletins() {
  this.http.get<{message: string; bulletins: any}>(
    'http://localhost:3000/api/bulletins'
  )
  .pipe(
    map(bulletinData => {
      return bulletinData.bulletins.map(bulletin => {
        return {
          id: bulletin._id,
          fullname: bulletin.fullname,
          subject: bulletin.subject,
          price: bulletin.price,
          location: bulletin.location,
          description: bulletin.description,
          timePosted: bulletin.timePosted
        };
      });
    })
  )
  .subscribe(transformedBulletins => {
    this.bulletins = transformedBulletins;
    this.bulletinsUpdated.next([...this.bulletins]);
  });
}
getBulletinUpdateListener() {
  return this.bulletinsUpdated.asObservable();
}

postBulletin(
  fullname: string,
  subject: string,
  price: string,
  location: string,
  description: string,
  timePosted: string,
) {

const bulletinData = {
  fullname: fullname,
  subject: subject,
  price: price,
  location: location,
  description: description,
  timePosted: timePosted
}
console.log(bulletinData);
  this.http.post<{message: string; bulletin: Bulletin}>(
    'http://localhost:3000/api/bulletins',
    bulletinData
  )
  .subscribe(response => {
    const bulletin: Bulletin = {
      id: response.bulletin.id,
      fullname: fullname,
      subject: subject,
      price: price,
      location: location,
      description: description,
      timePosted: timePosted,
    }
    this.bulletins.push(bulletin);
    this.bulletinsUpdated.next([...this.bulletins]);
  })
}


}
