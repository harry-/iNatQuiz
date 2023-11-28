import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private supabase: SupabaseClient;
 
  constructor() {
    const supabaseUrl = '';
    const supabaseKey = '';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }
 
  getSupabaseClient(): SupabaseClient {
    return this.supabase;
  }
}

