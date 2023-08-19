import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  constructor() {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email: string = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log({ email });

        if (email === 'juandavidsanol@gmail.com') {
          subscriber.next({ emailTaken: true });
          subscriber.complete();
        }

        subscriber.next(null);
        subscriber.complete();
      }
    ).pipe(delay(3000));

    return httpCallObservable;
  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email: string = control.value;
  //   console.log({ email });

  //   return of({
  //     emailTaken: true,
  //   });
  // }

  // return this.http.get<any[]>(`http://localhost:3000/users/?q=${email}`)
  //     .pipe(map( resp => { return (resp.length === 0 ) ? null : {emailTaken: true}}))
}
