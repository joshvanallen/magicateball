import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatInputModule,
        MatSliderModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSnackBarModule,
        AgmCoreModule.forRoot({
            apiKey: environment.gcpAPIKey,
            libraries: ['places', 'map']
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
