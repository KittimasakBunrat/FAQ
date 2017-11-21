"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/map");
var innsendt_1 = require("./innsendt");
var http_2 = require("@angular/http");
var SPA = (function () {
    function SPA(_http, fb) {
        this._http = _http;
        this.fb = fb;
        this.skjema = fb.group({
            id: [""],
            email: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
            sendtsporsmal: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])],
        });
    }
    SPA.prototype.ngOnInit = function () {
        this.laster = true;
        this.hentAlleKunder();
        this.visSkjema = false;
        this.visKundeListe = true;
        this.visInnsendtListe = false;
    };
    SPA.prototype.hentAlleKunder = function () {
        var _this = this;
        this._http.get("api/web/")
            .map(function (returData) {
            var JsonData = returData.json();
            return JsonData;
        })
            .subscribe(function (JsonData) {
            _this.alleKunder = [];
            if (JsonData) {
                for (var _i = 0, JsonData_1 = JsonData; _i < JsonData_1.length; _i++) {
                    var kundeObjekt = JsonData_1[_i];
                    _this.alleKunder.push(kundeObjekt);
                    _this.laster = false;
                }
            }
            ;
        }, function (error) { return alert(error); }, function () { return console.log("ferdig get-api/kunde"); });
    };
    ;
    SPA.prototype.hentAlleInnsendt = function () {
        var _this = this;
        this._http.get("api/is/")
            .map(function (returData) {
            var JsonData = returData.json();
            return JsonData;
        })
            .subscribe(function (JsonData) {
            _this.alleInnsendt = [];
            if (JsonData) {
                for (var _i = 0, JsonData_2 = JsonData; _i < JsonData_2.length; _i++) {
                    var innsendtObjekt = JsonData_2[_i];
                    _this.alleInnsendt.push(innsendtObjekt);
                }
            }
            ;
        }, function (error) { return alert(error); }, function () { return console.log("ferdig get-api/is"); });
    };
    ;
    SPA.prototype.registrerInnsendt = function () {
        this.skjema.setValue({
            id: "",
            email: "",
            sendtsporsmal: "",
        });
        this.skjema.markAsPristine();
        this.visKundeListe = false;
        this.skjemaStatus = "Registrere";
        this.visSkjema = true;
    };
    SPA.prototype.tilbakeTilListe = function () {
        this.visKundeListe = true;
        this.visSkjema = false;
        this.visInnsendtListe = false;
    };
    SPA.prototype.visInnsendt = function () {
        this.hentAlleInnsendt();
        this.visKundeListe = false;
        this.visInnsendtListe = true;
    };
    SPA.prototype.vedSubmit = function () {
        if (this.skjemaStatus == "Registrere") {
            this.lagreInnsendt();
        }
        else {
            alert("Feil i applikasjonen!");
        }
    };
    SPA.prototype.lagreInnsendt = function () {
        var _this = this;
        var lagretSporsmal = new innsendt_1.INNSENDT();
        lagretSporsmal.email = this.skjema.value.email;
        lagretSporsmal.sendtsporsmal = this.skjema.value.sendtsporsmal;
        var body = JSON.stringify(lagretSporsmal);
        var headers = new http_2.Headers({ "Content-Type": "application/json" });
        this._http.post("api/is", body, { headers: headers })
            .map(function (returData) { return returData.toString(); })
            .subscribe(function (retur) {
            _this.visSkjema = false;
            _this.visKundeListe = true;
        }, function (error) { return alert(error); }, function () { return console.log("ferdig post-api/is"); });
    };
    ;
    return SPA;
}());
SPA = __decorate([
    core_1.Component({
        selector: "min-app",
        templateUrl: "./app/SPA.html"
    }),
    __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder])
], SPA);
exports.SPA = SPA;
//# sourceMappingURL=SPA.js.map