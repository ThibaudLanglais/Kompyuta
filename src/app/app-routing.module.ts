import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { ComparateurComponent } from './comparateur/comparateur.component';
import { ConfigurateurComponent } from './configurateur/configurateur.component';
import { HomeComponent } from './home/home.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagePanierComponent } from './page-panier/page-panier.component';
import { PageSearchComponent } from './page-search/page-search.component';
import { PageTestComponent } from './page-test/page-test.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'search', component: PageSearchComponent},
  { path: 'product', redirectTo: ''},
  { path: 'product/:id', component: ProductPageComponent},
  { path: 'categorie', redirectTo: ''},
  { path: 'categorie/:slug', component: CategorieComponent},
  { path: 'panier', component: PagePanierComponent},
  { path: 'comparateur', component: ComparateurComponent},
  { path: 'configurateur', component: ConfigurateurComponent},
  { path: 'test', component: PageTestComponent},
  { path: 'mentions-legales', component: MentionsLegalesComponent},
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
