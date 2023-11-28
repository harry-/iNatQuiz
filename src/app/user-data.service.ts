import {Injectable}             from '@angular/core';
import { Subject } from 'rxjs';
import { UserData } from './inaturalist.interface';

@Injectable()
export class UserDataService {

    userData:UserData = {
    username: '',
    score: 0,
    questionindex: 0,
    id: 0
                  }
  

    private userDataSubject = new Subject<UserData>();
    userData$ = this.userDataSubject.asObservable();

    constructor() {}

    userDataChange(newUserData: UserData) {
        
        this.userDataSubject.next(newUserData);
        console.log("changing user from ", this.userData?.username, " to ", newUserData.username)
        this.userData = newUserData
    }
}