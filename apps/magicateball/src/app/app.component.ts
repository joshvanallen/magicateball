import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    ChangeDetectorRef,
    ApplicationRef
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
    selector: 'jva-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('autocomplete', { static: false })
    public autocompleteInput: ElementRef<HTMLInputElement>;
    public radiusValue: number = 0.5;
    public addressFormControl: string;
    public selectedPlace: google.maps.places.PlaceResult;

    private autocomplete: google.maps.places.Autocomplete;
    private currentPlaceId: google.maps.LatLng;
    private milesToMeters: number = 0.00062137;

    private filteredResults: any[] = [];

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private appRef: ApplicationRef
    ) {}

    ngOnInit() {
        this.mapsAPILoader.load().then(() => {
            this.autocomplete = new google.maps.places.Autocomplete(
                this.autocompleteInput.nativeElement
            );
            this.autocomplete.addListener('place_changed', () => {
                this.currentPlaceId = this.autocomplete.getPlace().geometry.location;
            });
        });
    }

    pickLocation() {
        const service = new google.maps.places.PlacesService(
            document.createElement('div')
        );
        const request = {
            location: {
                lat: this.currentPlaceId.lat(),
                lng: this.currentPlaceId.lng()
            },
            radius: this.radiusValue / this.milesToMeters,
            type: 'restaurant'
        };
        service.nearbySearch(request, (response, status, page) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                alert('ERROR!!');
            } else {
                for (let i = 0; i < response.length; i++) {
                    console.log('looping');
                    this.filteredResults.push(response[i]);
                }
                if (page.hasNextPage) {
                    console.log('next page');
                    page.nextPage();
                } else {
                    this.displayPick(this.randomPick(this.filteredResults));
                    this.filteredResults = [];
                }
                console.log('end');
            }
        });
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(info => {
                console.log(info);
                new google.maps.Geocoder().geocode(
                    {
                        location: {
                            lat: info.coords.latitude,
                            lng: info.coords.longitude
                        }
                    },
                    response => {
                        if (response && response.length > 0) {
                            console.log(response);
                            this.addressFormControl =
                                response[0].formatted_address;
                            this.currentPlaceId = response[0].geometry.location;
                            // this.cdr.markForCheck();
                            this.appRef.tick();
                        }
                    }
                );
            });
        }
    }

    randomPick(filteredResults: any[]) {
        if (filteredResults) {
            let randNum;
            do {
                randNum = Math.floor(Math.random() * filteredResults.length);
            } while (filteredResults[randNum].prevSelected);
            filteredResults[randNum].prevSelected = true;
            return randNum;
        }
    }

    displayPick(randNum) {
        this.selectedPlace = this.filteredResults[randNum];
        this.selectedPlace['href'] =
            'https://www.google.com/maps/place/' +
            this.selectedPlace.vicinity.replace(/ /g, '+');
        console.log(
            'https://www.google.com/maps/place' +
                this.filteredResults[randNum].vicinity.replace(/ /g, '+')
        );
        console.log(this.filteredResults[randNum].name);
        this.appRef.tick();
    }
}
