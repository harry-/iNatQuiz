import { Component } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ClarityIcons, userIcon, infoStandardIcon, stepForward2Icon } from '@cds/core/icon';
import { Injectable, inject } from '@angular/core';
import { Observation } from './inaturalist.interface';
import { InatApiService } from './inat-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'iNatQuiz';
   private inatApiService: InatApiService = inject(InatApiService)

  constructor() {

    ClarityIcons.addIcons(userIcon, infoStandardIcon, stepForward2Icon)

    
  }
   ngOnInit() {
             try{
             this.inatApiService.loadObservations
         }catch(e){
          console.log(e)
       
      }
  }
}
