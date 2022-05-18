import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { TextIconButtonComponent } from './text-icon-button/text-icon-button.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PageTestComponent } from './page-test/page-test.component';
import { ConfigurateurComponent } from './configurateur/configurateur.component';
import { ComparateurComponent } from './comparateur/comparateur.component';
import { HttpClientModule } from '@angular/common/http';
import { CategorieComponent } from './categorie/categorie.component';
import { NavigationStart } from '@angular/router';
import { SearchItemComponent } from './search-item/search-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PagePanierComponent } from './page-panier/page-panier.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CardComponent,
    FooterComponent,
    ProductPageComponent,
    MentionsLegalesComponent,
    TextIconButtonComponent,
    BreadcrumbComponent,
    PageTestComponent,
    ConfigurateurComponent,
    ComparateurComponent,
    CategorieComponent,
    SearchItemComponent,
    PagePanierComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
