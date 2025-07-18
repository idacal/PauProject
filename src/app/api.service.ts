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

  // Public observables for components to subscribe
  items$: Observable<any[]> = this.itemsSubject.asObservable();
  response$: Observable<any> = this.responseSubject.asObservable();

  async fetchByName(name: string): Promise<void> {
    try {
      const res = await axios.get(`${this.baseUrl}/company/${name}`);
      this.itemsSubject.next(res.data);
    } catch (err) {
      console.error('fetchByName error', err);
      this.itemsSubject.next([]);
    }
  }

  async createAssessment(company: any, industry: any): Promise<void> {
    try {
      const body = {
        company: company, // CompanyInfoDto
        industry: industry // IndustryDTO
      };
      const res = await axios.post(`${this.baseUrl}/create`, body);
      this.responseSubject.next(res.data);
    } catch (err) {
      console.error('createAssessment error', err);
      this.responseSubject.next({ error: 'API error' });
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
}
