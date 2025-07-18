import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  name = '';
  item = '';
  category = '';

  selectedItem: any;
  itemCategories: any[] = [];

  selectedCategory: any;

  // Declare without initializing
  items$: Observable<any[]>;
  response$: Observable<any>;

  constructor(private api: ApiService) {
    // Assign here, after api is available
    this.items$ = this.api.items$;
    this.response$ = this.api.response$;
  }

  async onSubmit(form: NgForm) {
    if (form.valid) return;
    await this.api.fetchByName(this.name);
    form.resetForm();
  }
}
