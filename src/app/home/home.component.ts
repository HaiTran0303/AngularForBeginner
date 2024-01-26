import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  //update the 'imports' property of the component metadata
  imports: [
    CommonModule,
    HousingLocationComponent,
  ],
  //create app's layout
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click) = "filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <!-- add housing location to the component -->
    <!-- adding a property binding to a component tag -->
    <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>  </section>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: HousingLocation[] = [

  ];

  filteredLocationList: HousingLocation[] = [

  ];

  //inject the new service and initialize the data for the app.
  //The constructor is the first function that runs when this component is instantiated is created
  //The code in the constructor will assign the housingLocationList the value returned from the call to getAllHousingLocations
  housingService: HousingService = inject(HousingService);

  // constructor() {
  //   this.housingLocationList = this.housingService.getAllHousingLocations();
  //   this.filteredLocationList = this.housingLocationList;
  // }
  //change to below
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}


