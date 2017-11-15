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
var SPA = (function () {
    function SPA(_http, fb) {
        this._http = _http;
        this.fb = fb;
        this.skjema = fb.group({
            ID: [""],
            Sporsmal: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])],
            Svar: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])],
        });
    }
    SPA.prototype.ngOnInit = function () {
        this.laster = true;
        this.hentAlleKunder();
        this.visSkjema = false;
        this.visKundeListe = true;
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
    SPA.prototype.tilbakeTilListe = function () {
        this.visKundeListe = true;
        this.visSkjema = false;
    };
    // her blir kunden hentet og vist i skjema
    SPA.prototype.endreKunde = function (id) {
        var _this = this;
        this._http.get("api/web/" + id)
            .map(function (returData) {
            var JsonData = returData.json();
            return JsonData;
        })
            .subscribe(function (JsonData) {
            _this.skjema.patchValue({ id: JsonData.ID });
            _this.skjema.patchValue({ sporsmal: JsonData.sporsmal });
            _this.skjema.patchValue({ svar: JsonData.svar });
        }, function (error) { return alert(error); }, function () { return console.log("ferdig get-api/kunde"); });
        this.skjemaStatus = "Endre";
        this.visSkjema = true;
        this.visKundeListe = false;
    };
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