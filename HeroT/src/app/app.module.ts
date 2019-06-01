import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { HeroesDetailComponent } from './heroes-detail/heroes-detail.component'
import { HeroesComponent } from './heroes/heroes.component'



const routes: Routes = [
  { path: '', redirectTo: 'dashborad', pathMatch: 'full' },
  { path: 'heros', component: HeroesComponent },
  { path: 'dashborad', component: DashboradComponent },
  { path: 'detail/:id', component: HeroesDetailComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    DashboradComponent,
    HeroesDetailComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
