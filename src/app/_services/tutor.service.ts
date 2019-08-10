import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdentificationData } from '../_models/tutor-data/identificationData.model';


@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient) { }

  updateIdentification(
    id: string,
    cv: File | string,
    identification: File | string
  ) {
    let identificationData: IdentificationData | FormData;
      identificationData = new FormData();
      identificationData.append('id', id);
      identificationData.append('cv', cv);
      identificationData.append('identification', identification);
    this.http.put('http://localhost:3000/api/tutor/identification/' + id, identificationData)
    .subscribe(response => {
      console.log(response);
    });
  }
}
