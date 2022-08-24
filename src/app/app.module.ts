import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { LayoutComponent } from './layout/layout.component';
import { ManualInputComponent } from './input/manual-input/manual-input.component';
import { BatchProcessingComponent } from './simulators/batch-processing/batch-processing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiprogrammingComponent } from './simulators/multiprogramming/multiprogramming.component';
import { AutomaticInputComponent } from './input/automatic-input/automatic-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ManualInputComponent,
    BatchProcessingComponent,
    MultiprogrammingComponent,
    AutomaticInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      extendedTimeOut: 3000,
      closeButton: true
    }),
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
