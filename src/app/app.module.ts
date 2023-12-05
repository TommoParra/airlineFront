import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
=======
import { HomeComponent } from './pages/home/home.component';
import { AccessLightboxComponent } from './components/access-lightbox/access-lightbox.component';
import { HeroComponent } from './components/hero/hero.component';
>>>>>>> 4ac1762aa629662b14ded282b5c5503ba9a42688

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HeaderComponent,
    FooterComponent
=======
    HomeComponent,
    AccessLightboxComponent,
    HeroComponent
>>>>>>> 4ac1762aa629662b14ded282b5c5503ba9a42688
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
