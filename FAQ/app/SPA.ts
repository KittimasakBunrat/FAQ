import { Component, OnInit } from "@angular/core";
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import "rxjs/add/operator/map";
import { FAQ } from "./FAQ";
import { INNSENDT } from "./innsendt";
import { Headers } from "@angular/http";


@Component({
    selector: "min-app",
    templateUrl: "./app/SPA.html"
})
export class SPA {
    visSkjema: boolean;
    skjemaStatus: string;
    visKundeListe: boolean;
    visInnsendtListe: boolean;
    alleKunder: Array<FAQ>;
    alleInnsendt: Array<INNSENDT>;
    skjema: FormGroup;
    laster: boolean;

    constructor(private _http: Http, private fb: FormBuilder) {
        this.skjema = fb.group({
            id: [""],
            email: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])],
            sendtsporsmal: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])],
        });
    }

    ngOnInit() {
        this.laster = true;
        this.hentAlleKunder();
        this.visSkjema = false;
        this.visKundeListe = true;
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
                        this.alleKunder.push(innsendtObjekt);
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
        this.visKundeListe = false;
        this.skjemaStatus = "Registrere";
        this.visSkjema = true;
    }

    tilbakeTilListe() {
        this.visKundeListe = true;
        this.visSkjema = false;
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
                this.visKundeListe = true;
            },
            error => alert(error),
            () => console.log("ferdig post-api/is")
            );
    };

}