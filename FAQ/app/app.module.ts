import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { SPA } from './SPA';
import { Grupper } from './grupper';
@NgModule({
    imports: [BrowserModule, BrowserModule, ReactiveFormsModule, HttpModule, JsonpModule],
    declarations: [SPA, Grupper],
    bootstrap: [SPA]
})
export class AppModule { }