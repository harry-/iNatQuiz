import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { DatabaseService } from '../database.service';
import { UserDataService } from '../user-data.service';
import { ResultsSearch, UserData } from '../inaturalist.interface';
import { Observation, Photo } from '../inaturalist.interface';
import { InatApiService } from '../inat-api.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  userData: UserData = {
    username: '',
    score: 0,
    questionindex: 0,
    id: 0
                  }
  

  receivedName: string = 'none';
  //apiResult: ResultsSearch = {};

  observations: Observation[] = [];

  private inatApiService: InatApiService = inject(InatApiService)
  
  jsonData: any;
  rawData: any;

photo: Photo | undefined;
currentPhotos: Photo[] = [];

currentGenus: string | undefined = ''
currentSpecies: string | undefined = ''
currentGermanName: string | undefined = ''
currentEnglishName: string | undefined = ''

answer: string = ''



 

  constructor(private databaseService: DatabaseService, private userDataService: UserDataService, private http: HttpClient) {
     
   console.log("constructor called")


     this.userDataService.userData$.subscribe( {
      next: x => (this.userData = x, console.log("user changed to ", this.userData.username))

    }
    
    );

    this.userData = userDataService.userData

  }
  
  async ngOnInit() {

    console.log("onInit called")


    


    this.http.get('https://api.inaturalist.org/v1/observations?identified=true&place_id=10468&hrank=genus&identifications=most_agree&locale=de&per_page=200&order=desc&order_by=created_at').subscribe(data => {

      this.jsonData = JSON.stringify(data)
      this.rawData = data

      this.observations = this.rawData.results

      this.currentPhotos = this.observations[this.userData.questionindex].photos
      this.currentGenus = this.observations[this.userData.questionindex].taxon?.name?.split(" ", 1)[0]
      this.currentSpecies = this.observations[this.userData.questionindex].taxon?.name?.split(" ", 1)[1]
      this.currentGermanName = this.observations[this.userData.questionindex].taxon?.preferred_common_name;
      this.currentEnglishName = this.observations[this.userData.questionindex].taxon?.english_common_name;

      console.log("english name: ", this.currentEnglishName)
      console.log("german name: ", this.currentGermanName)
      console.log("scientific name: ", this.currentGenus, " ", this.currentSpecies)
      console.log("number of pics: ", this.currentPhotos.length)
      console.log("index: ", this.userData.questionindex)

      for (let photo of this.currentPhotos) {
        photo.url = photo.url.replace('square', 'medium');
      }


    });
 
  }

 async submitForm(): Promise<void> {
    console.log(this.answer);

    if(this.answer == this.currentGermanName || this.answer == this.currentEnglishName ) {

      console.log("correct answer :) increasing score for user ", this.userData?.username )

      let { data, error } = await this.databaseService.getSupabaseClient().rpc('incrementscore', {
        incrementby : 1, 
        userid:this.userData?.id
      })

    console.log("db error: ", error)
    console.log("db answer: ", data)

    } else {
        console.log("wrong answer, moving on")
    }
    
    let { data, error } = await this.databaseService.getSupabaseClient().rpc(
      'incrementindex', {
      incrementby : 1, 
      userid:this.userData?.id
    })


    this.userData.questionindex++
    console.log("question index increased to ", this.userData.questionindex)
    this.userDataService.userDataChange(this.userData) 
    this.ngOnInit();
  }
}
