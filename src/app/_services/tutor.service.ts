import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdentificationData } from '../_models/tutor-data/identificationData.model';
import { BioData } from '../_models/tutor-data/bioData.model';
import { SubjectData } from '../_models/tutor-data/subjectData.model';
import { AvailabilityData } from '../_models/tutor-data/availabilityData.model';
import { TutorData } from '../_models/tutor-data/tutorData.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  private tutors: TutorData[] = [];
  private tutorsUpdated = new Subject<TutorData[]>();

  constructor(private http: HttpClient) { }
// Consider splitting out into Tutor Registration Service and Tutor Listing Service
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

  checkIdentification(
    id: string
  ) {
    return this.http.get<{identification: any}>(
        'http://localhost:3000/api/tutors/identification/' + id
      ).subscribe(response => {
        if(response.identification) {
        if (response.identification.cvPath && response.identification.cvPath) {
          this.identificationIsAdded = true;
          this.identificationStatusListener.next(true);
        }
      }
      })};

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

  checkBio(id: string
  ) {
    return this.http.get<{bio: any}>(
        'http://localhost:3000/api/tutors/bio/' + id
      ).subscribe(response => {
        console.log(response);
        if (response.bio.bio && response.bio.location && response.bio.profilePath) {
          this.bioIsAdded = true;
          this.bioStatusListener.next(true);
        }
      })};

  getIsBio() {
    return this.bioIsAdded;
  }

  getBioStatusListener() {
    return this.bioStatusListener.asObservable();
  }

  updateBio(
    id: string,
    bio: string,
    location: string,
    profile: File
  ) {
    let bioData = new FormData();
    bioData.append("id", id);
    bioData.append("bio", bio);
    bioData.append("location", location);
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

  checkSubject(
    id: string
    ) {
      return this.http.get<{subject: any}>(
          'http://localhost:3000/api/tutors/subject/' + id
        ).subscribe(response => {
          console.log(response);
          if (response.subject.subject && response.subject.price && response.subject.specialisationList) {

            this.subjectIsAdded = true;
            this.subjectStatusListener.next(true);
          }
        })};

  getIsSubject() {
    return this.subjectIsAdded;
  }

  getSubjectStatusListener() {
    return this.subjectStatusListener.asObservable();
  }

  updateSubject(
    id: string,
    subject: string,
    price: number,
    specialisationList: Array<string>
  ) {
    let subjectData: SubjectData;
    subjectData = {
      id: id,
      subject: subject,
      price: price,
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

  checkAvailability(id: string
  ) {
    return this.http.get<{availability: any}>(
        'http://localhost:3000/api/tutors/availability/' + id
      ).subscribe(response => {
        console.log(response);
        if (response.availability.monday || response.availability.tuesday || response.availability.wednesday || response.availability.thursday || response.availability.friday || response.availability.saturday || response.availability.sunday) {
          this.availabilityIsAdded = true;
          this.availabilityStatusListener.next(true);
          console.log('triggered');
        }
      })};

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

  getTutors() {
    console.log('getTutors() is triggered');
    this.http.get<{message: string; tutors: any}>(
      'http://localhost:3000/api/tutors/list'
    )
    .pipe(
      map(tutorData => {
        return tutorData.tutors.map(tutor => {
          return {
            firstname: tutor.firstname,
            lastname: tutor.lastname,
            bio: tutor.bio,
            profilePath: tutor.profilePath,
            subject: tutor.subject,
            specialisationList: tutor.specialisationList,
            monday: tutor.monday,
            tuesday: tutor.tuesday,
            wednesday: tutor.wednesday,
            thursday: tutor.thursday,
            friday: tutor.friday,
            saturday: tutor.saturday,
            sunday: tutor.sunday
          }
        })
      })
    ).subscribe(transformedTutors => {
      this.tutors = transformedTutors;
      this.tutorsUpdated.next([...this.tutors]);
    })
  }

  getTutorUpdateListener() {
  return this.tutorsUpdated.asObservable();
}

}
