import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'jva-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('autocomplete')
  autocompleteInput: ElementRef<HTMLInputElement>;
  public radiusValue:number;
  public addressFormControl: FormControl = new FormControl();
  private autocomplete: google.maps.places.Autocomplete;
  private currentPlaceId;

  constructor(private mapsAPILoader: MapsAPILoader, private cdr:ChangeDetectorRef) {}

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(info => {
          new google.maps.Geocoder().geocode({
            location: {
              lat: info.coords.latitude,
              lng: info.coords.longitude
            }
          }, (response)=>{
            if(response && response.length > 0){
              this.addressFormControl.setValue(response[0].formatted_address);
              this.currentPlaceId = response[0].place_id;
              this.cdr.markForCheck();
            }
          })
        });
      }
      this.autocomplete = new google.maps.places.Autocomplete(
        this.autocompleteInput.nativeElement
      );
      this.autocomplete.addListener('place_changed', () => {
        this.currentPlaceId = this.autocomplete.getPlace().place_id;
      });
    });
  }

  ngAfterViewInit() {}
}
