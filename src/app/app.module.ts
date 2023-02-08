import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import * as firebase from 'firebase/app';

import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';
import { SharedModule } from 'shared/shared.module';
import { PromosModule } from './promos/promos.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ShoppingModule,
    PromosModule,
    AdminModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    // AngularFireAuth,
    // {
    //     provide: SETTINGS,
    //     useValue: environment.useEmulators ? {
    //         host: 'http://localhost:8000',
    //         ssl: false
    //     } : undefined
    // },
    // { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? 
    //     ['http://localhost', 9097] : undefined
    // },
    // { provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? 
    //     ['http://localhost', 7000] : undefined
    // }
    // { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? 
    //     ['http://localhost', 5001] : undefined
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        firebase.initializeApp(environment.firebaseConfig)
    }
}
