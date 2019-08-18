import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdentificationData } from '../_models/tutor-data/identificationData.model';
import { BioData } from '../_models/tutor-data/bioData.model';
import { SubjectData } from '../_models/tutor-data/subjectData.model';
import { AvailabilityData } from '../_models/tutor-data/availabilityData.model';
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
  private experienceStatusListener = new Subject<boolean>();
  experienceIsAdded: boolean;
  private subjectStatusListener = new Subject<boolean>();
  subjectIsAdded: boolean;
  private availabilityStatusListener = new Subject<boolean>();
  availabilityIsAdded: boolean;

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
    bio: string,
    profile: File
  ) {
    let bioData = new FormData();
    bioData.append("id", id);
    bioData.append("bio", bio);
    bioData.append("profile", profile);
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

  getIsExperience() {
    return this.experienceIsAdded;
  }

  getExperienceStatusListener() {
    return this.experienceStatusListener.asObservable();
  }

  getIsSubject() {
    return this.subjectIsAdded;
  }

  getSubjectStatusListener() {
    return this.subjectStatusListener.asObservable();
  }

  updateSubject(
    id: string,
    subject: string,
    specialisationList: string
  ) {
    let subjectData: SubjectData;
    subjectData = {
      id: id,
      subject: subject,
      specialisationList: specialisationList
    }

    this.http.put('http://localhost:3000/api/tutors/subject/' + id, subjectData, { observe: 'response'})
    .subscribe(response => {
      console.log(response);
      console.log(response.status)
      if(response.status === 200) {
        this.subjectIsAdded = true;
        this.subjectStatusListener.next(true);
      }
    })
  }

  getIsAvailability() {
    return this.availabilityIsAdded;
  }

  getAvailabilityStatusListener() {
    return this.availabilityStatusListener.asObservable();
  }

  updateAvailability(
    id: string,
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string,
    sunday: string
  ) {
    let availabilityData: AvailabilityData;
    availabilityData = {
      id: id,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday
    }

    this.http.put('http://localhost:3000/api/tutors/availability/' + id, availabilityData, { observe: 'response'})
    .subscribe(response => {
      console.log(response);
      console.log(response.status)
      if(response.status === 200) {
        this.availabilityIsAdded = true;
        this.availabilityStatusListener.next(true);
      }
    })

  }

}
