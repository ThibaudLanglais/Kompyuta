import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparateurComponent } from './comparateur/comparateur.component';
import { ConfigurateurComponent } from './configurateur/configurateur.component';
import { HomeComponent } from './home/home.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { PageTestComponent } from './page-test/page-test.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'product', component: ProductPageComponent},
  { path: 'comparateur', component: ComparateurComponent},
  { path: 'configurateur', component: ConfigurateurComponent},
  { path: 'test', component: PageTestComponent},
  { path: 'mentions-legales', component: MentionsLegalesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
