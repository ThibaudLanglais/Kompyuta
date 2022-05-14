import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'product', component: ProductPageComponent},
  { path: 'mentions-legales', component: MentionsLegalesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
