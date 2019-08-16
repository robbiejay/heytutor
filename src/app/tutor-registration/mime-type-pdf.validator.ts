import {AbstractControl} from '@angular/forms';
import {Observable, Observer, of} from 'rxjs';

export const mimeTypePdf = (
  control: AbstractControl
): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
if (typeof(control.value) === 'string') {
return of(null);
}
console.log('. . . MimeTypePdf is accessed');
const file = control.value as File;
const fileReader = new FileReader();
const frObs = Observable.create(
  (observer: Observer<{ [key: string]: any}>) => {
  fileReader.addEventListener("loadend", () => {
const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
console.log(fileReader);
    let header = "";
    let isValid = false;
    for (let i = 0; i < arr.length; i++) {
      header += arr[i].toString(16);
    }
    switch (header) {
      case "25504446":
      isValid = true;
      console.log('. . . MimeType is pdf, and therefore valid');
      break;
      default:
      isValid = false;
      console.log('. . . MimeType is invalid');
      break;
    }
    if (isValid) {
      observer.next(null);
    } else {
      observer.next({invalidMimeType: true});
    }
    observer.complete();
  });
  fileReader.readAsArrayBuffer(file);
});
return frObs;
};
