import { Component, OnInit } from "@angular/core";
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import "rxjs/add/operator/map";
import { FAQ } from "./FAQ";
import { Headers } from "@angular/http";


@Component({
    selector: "min-app",
    templateUrl: "./app/SPA.html"
})
export class SPA {
    visSkjema: boolean;
    skjemaStatus: string;
    visKundeListe: boolean;
    alleKunder: Array<FAQ>; // for listen av alle kundene
    skjema: FormGroup;
    laster: boolean;

    constructor(private _http: Http, private fb: FormBuilder) {
        this.skjema = fb.group({
            id: [""],
            sporsmal: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])],
            svar: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])],
      });
    }

    ngOnInit() {
        this.laster = true;
        this.hentAlleKunder();
        this.visSkjema = false;
        this.visKundeListe = true;
    }

    hentAlleKunder() {
        this._http.get("api/web/")
            .map(returData => {
                let JsonData = returData.json();
                return JsonData;
            })
            .subscribe(
            JsonData => {
                this.alleKunder = [];
                if (JsonData) {
                    for (let kundeObjekt of JsonData) {
                        this.alleKunder.push(kundeObjekt);
                        this.laster = false;
                    }
                };
            },
            error => alert(error),
            () => console.log("ferdig get-api/kunde")
            );
    };

    tilbakeTilListe() {
        this.visKundeListe = true;
        this.visSkjema = false;
    }


}