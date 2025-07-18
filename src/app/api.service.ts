import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://rqs-demo.evalueserve.com/rfl/api/v1';

  // Private subjects hold the current state
  private itemsSubject = new BehaviorSubject<any[]>([]);
  private responseSubject = new BehaviorSubject<any>(null);
  private companyInfoSubject = new BehaviorSubject<any>(null);

  // Public observables for components to subscribe
  items$: Observable<any[]> = this.itemsSubject.asObservable();
  response$: Observable<any> = this.responseSubject.asObservable();
  companyInfo$: Observable<any> = this.companyInfoSubject.asObservable();

  async fetchByName(name: string): Promise<void> {
    try {
      const res = await axios.get(`${this.baseUrl}/company/${name}`);
      this.itemsSubject.next(res.data);
    } catch (err) {
      console.error('fetchByName error', err);
      this.itemsSubject.next([]);
    }
  }

  async createAssessment(company: any, industry: any): Promise<any> {
    try {
      const body = {
        company: company, // CompanyInfoDto
        industry: industry // IndustryDTO
      };
      
      console.log('API Service - About to send POST request to:', `${this.baseUrl}/assessment/create`);
      console.log('API Service - Request body:', JSON.stringify(body, null, 2));
      
      const res = await axios.post(`${this.baseUrl}/assessment/create`, body);
      
      // Store both the response and the company info for the company-information page
      this.responseSubject.next(res.data);
      this.companyInfoSubject.next(res.data);
      
      return res.data; // Return the data so Landing can use it
    } catch (err) {
      console.error('createAssessment error', err);
      const errorData = { error: 'API error' };
      this.responseSubject.next(errorData);
      throw err; // Re-throw so Landing can handle it
    }
  }

  async getAssessments(): Promise<void> {
    try {
      const res = await axios.get(`${this.baseUrl}/assessment`);
      this.responseSubject.next(res.data);
    } catch (err) {
      console.error('getAssessments error', err);
      this.responseSubject.next({ error: 'API error' });
    }
  }

  async getAssessmentById(id: string): Promise<void> {
    try {
      const res = await axios.get(`${this.baseUrl}/assessment/${id}`);
      this.responseSubject.next(res.data);
    } catch (err) {
      console.error('getAssessmentById error', err);
      this.responseSubject.next({ error: 'API error' });
    }
  }

  // Helper method to clear company info when starting a new search
  clearCompanyInfo(): void {
    this.companyInfoSubject.next(null);
  }
}
