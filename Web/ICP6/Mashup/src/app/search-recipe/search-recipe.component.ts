import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }



  getRecipe() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      /**
       * Write code to get recipe
       */

      this._http.get(
        'https://api.edamam.com/search?q=' + this.recipeValue +
        '&app_id=525894ab&app_key=ff9e741ffd6997fda030c36805455e14').subscribe((data: any) => {

          console.log(data);
          if (data.hits.length == 0) {
            alert('Please check the receipe value')
          }
          this.recipeList = data.hits;
        });
    }
  }
  getPlaces() {
    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      /**
       * Write code to get place
       */
      let header = new HttpHeaders().set(
        "Authorization", "fsq3Zp8HiJy2VoNrYEbnJJ4J1Twybat/ihMm5g6p/mV5bGs=");
      const httpOptions = {
        headers: header
      };
      this._http.get(
        "https://api.foursquare.com/v3/places/search?" +
        "client_id=VKRGLUSP31TQFXKAUNRNWWBVPNBH5IKIIUFXWOKQNWOZ0J5F" +
        "&client_secret=OTIFSBGWPOZGBQ212WPM5CAS32UWMYGNRYIEUFKJ1GUQTU0K" +
        "&query=" + this.recipeValue + "&near=" + this.placeValue +
        "&v=20220220", httpOptions).subscribe((response: any) => {
          console.log(response);
          if (response.results.length == 0) {
            alert('please check the city name')
          }
          this.venueList = response.results;
        });

    }
  }
}  


