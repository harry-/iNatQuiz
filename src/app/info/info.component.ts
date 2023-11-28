import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  userData: any[] = [];
 
  constructor(private databaseService: DatabaseService) {}
 
  async ngOnInit(): Promise<void> {
    await this.loadUserData();
  }
 
  async loadUserData(): Promise<void> {
    try {
      const response = await this.databaseService.getSupabaseClient()
        .from('iNatQuizUser') 
        .select('*')
         .order('score', { ascending: false });
 
      if (response.data) {
        this.userData = response.data;
        console.log(this.userData);
        console.log(response.count)
      }


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
