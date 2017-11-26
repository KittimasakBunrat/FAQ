import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import "rxjs/add/operator/map";
import { FAQ } from "./FAQ";
import { INNSENDT } from "./innsendt";
import { Headers } from "@angular/http";
import { Search } from "./search";

@Component({
    selector: "min-app",
    templateUrl: "./app/SPA.html"    
})
export class SPA {
    visSkjema: boolean;
    skjemaStatus: string;
    visFAQListe: boolean;
    visInnsendtListe: boolean;
    isDesc: boolean = false;
    column: string = 'CategoryName';
    alleFAQ: Array<FAQ>;
    alleInnsendt: Array<INNSENDT>;

    skjema: FormGroup;
    laster: boolean;

    constructor(private _http: Http, private fb: FormBuilder) {
        this.skjema = fb.group({
            id: [""],
            email: [null, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
            sendtsporsmal: [null, null ],
        });
    }

    

    ngOnInit() {
        this.laster = true;
        this.hentAlleKunder();
        this.visSkjema = false;
        this.visFAQListe = true;
        this.visInnsendtListe = false;
        
    }

    hentAlleKunder() {
        this._http.get("api/web/")
            .map(returData => {
                let JsonData = returData.json();
                return JsonData;
            })
            .subscribe(
            JsonData => {
                this.alleFAQ = [];
                if (JsonData) {
                    for (let kundeObjekt of JsonData) {
                        this.alleFAQ.push(kundeObjekt);
                        this.laster = false;
                    }
                };
            },
            error => alert(error),
            () => console.log("ferdig get-api/kunde")
            );
    };

    hentAlleInnsendt() {
        this._http.get("api/is/")
            .map(returData => {
                let JsonData = returData.json();
                return JsonData;
            })
            .subscribe(
            JsonData => {
                this.alleInnsendt = [];
                if (JsonData) {
                    for (let innsendtObjekt of JsonData) {
                        this.alleInnsendt.push(innsendtObjekt);
                    }
                };
            },
            error => alert(error),
            () => console.log("ferdig get-api/is")
            );
    };

    registrerInnsendt() {

        this.skjema.setValue({
            id: "",
            email: "",
            sendtsporsmal: "",
        });
        this.skjema.markAsPristine();
        this.visFAQListe = false;
        this.skjemaStatus = "Registrere";
        this.visSkjema = true;
        this.visInnsendtListe = false;
    }

    tilbakeTilListe() {
        this.visFAQListe = true;
        this.visSkjema = false;
        this.visInnsendtListe = false;
    }

    visInnsendt() {
        this.hentAlleInnsendt();
        this.visSkjema = false;
        this.visFAQListe = false;
        this.visInnsendtListe = true;
    }

    vedSubmit() {
        if (this.skjemaStatus == "Registrere") {
            this.lagreInnsendt();
        }
        else {
            alert("Feil i applikasjonen!");
        }
    }

    lagreInnsendt() {
        var lagretSporsmal = new INNSENDT();

        lagretSporsmal.email = this.skjema.value.email;
        lagretSporsmal.sendtsporsmal = this.skjema.value.sendtsporsmal;

        var body: string = JSON.stringify(lagretSporsmal);
        var headers = new Headers({ "Content-Type": "application/json" });

        this._http.post("api/is", body, { headers: headers })
            .map(returData => returData.toString())
            .subscribe(
            retur => {
                this.visSkjema = false;
                this.visFAQListe = true;
            },
            error => alert(error),
            () => console.log("ferdig post-api/is")
            );
    };

    sort(property: any) {
        this.isDesc = !this.isDesc; //change the direction    
        this.column = property;
        let direction = this.isDesc ? 1 : -1;

        this.alleInnsendt.sort(function (a, b) {
            if (a[property] < b[property]) {
                return -1 * direction;
            }
            else if (a[property] > b[property]) {
                return 1 * direction;
            }
            else {
                return 0;
            }
        });
    };

 

}


    

