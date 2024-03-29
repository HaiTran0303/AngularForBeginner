//import the input decorator
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  //using the routerLink to navigate to the details pages
  template: `
  <section class="listing">
    <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
    <h2 class="listing-heading">{{ housingLocation.name }}</h2>
    <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>
    <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
  </section>
`,
  styleUrl: './housing-location.component.scss'
})
//add the input property
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
