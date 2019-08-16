import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdentificationData } from '../_models/tutor-data/identificationData.model';
import { BioData } from '../_models/tutor-data/bioData.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient) { }

  private identificationStatusListener = new Subject<boolean>();
  identificationIsAdded: boolean;
  private bioStatusListener = new Subject<boolean>();
  bioIsAdded: boolean;

  getIsIdentified() {
    return this.identificationIsAdded;
  }

  getIdentificationStatusListener() {
    return this.identificationStatusListener.asObservable();
  }

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
    this.http.put('http://localhost:3000/api/tutors/identification/' + id, identificationData, { observe: 'response'})
    .subscribe(response => {
      console.log(response);
      console.log(response.status)
       if(response.status === 200) {
         this.identificationIsAdded = true;
         this.identificationStatusListener.next(true);
       }
    });
  }

  getIsBio() {
    return this.bioIsAdded;
  }

  getBioStatusListener() {
    return this.bioStatusListener.asObservable();
  }

  updateBio(
    id: string,
    bio: string
  ) {
    let bioData: BioData;
    bioData = {
      id: id,
      bio: bio
    }
    console.log(bioData);
    this.http.put('http://localhost:3000/api/tutors/bio/' + id, bioData, { observe: 'response'})
    .subscribe(response => {
      console.log(response);
      console.log(response.status)
      if(response.status === 200) {
        this.bioIsAdded = true;
        this.bioStatusListener.next(true);
      }
    })
  }
}
