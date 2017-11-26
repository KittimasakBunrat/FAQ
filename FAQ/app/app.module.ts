import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { SPA } from './SPA';
import { Grupper } from './grupper';
import { Search } from './search';

@NgModule({
    imports: [BrowserModule, BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, JsonpModule],
    declarations: [SPA, Grupper, Search],
    bootstrap: [SPA]
})
export class AppModule { }