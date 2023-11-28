import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { UserDataService } from '../user-data.service';
import { UserData } from '../inaturalist.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  responseData: any[] = [];

    userData: UserData = {id:0, score:0, username: '', questionindex: 0 } 

  constructor(private databaseService: DatabaseService, private userDataService: UserDataService) {}
 
 async submitForm(): Promise<void> {
    console.log(this.userData);

        try {
      const {data, count} = await this.databaseService.getSupabaseClient()
        .from('iNatQuizUser') 
        .select('*', { count: 'exact' })
        .match({  user: this.userData?.username })  ;
 
      if (data) {
        this.responseData = data;
        console.log(this.responseData);
        
      }

     if(count == 0) {
        console.log("user", this.userData.username, " not found, so lets create it")

        const {data, error } = await this.databaseService.getSupabaseClient()
          .from('iNatQuizUser')
          .insert({  user: this.userData.username })


          
      }

         } catch (error) {
      console.error('Error fetching data:', error);
    }

      try {
      const {data, count} = await this.databaseService.getSupabaseClient()
        .from('iNatQuizUser') 
        .select('*', { count: 'exact' })
        .match({  user: this.userData?.username })  ;
 
      if (data) {
        this.responseData = data;
        console.log(this.responseData);
        if(count==1) {
          this.userData.id = data[0].id
          this.userData.score = data[0].score
          this.userData.username = data[0].user
          this.userData.questionindex = data[0].questionindex
        }
        
      }

      console.log(this.userData)
      console.log(this.responseData)
      this.userDataService.userDataChange(this.userData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


}
