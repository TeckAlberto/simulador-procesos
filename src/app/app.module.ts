import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { LayoutComponent } from './layout/layout.component';
import { ManualInputComponent } from './input/manual-input/manual-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ManualInputComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      extendedTimeOut: 3000,
      closeButton: true
    }),
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
