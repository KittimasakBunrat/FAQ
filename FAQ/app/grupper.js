"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Grupper = (function () {
    function Grupper() {
    }
    Grupper.prototype.transform = function (list, tekst) {
        var gruppering = list.reduce(function (prev, cur) {
            if (!prev[cur[tekst]]) {
                prev[cur[tekst]] = [cur];
            }
            else {
                prev[cur[tekst]].push(cur);
            }
            return prev;
        }, {});
        return Object.keys(gruppering).map(function (key) { return ({ key: key, value: gruppering[key] }); });
    };
    return Grupper;
}());
Grupper = __decorate([
    core_1.Pipe({ name: 'grupper' })
], Grupper);
exports.Grupper = Grupper;
//# sourceMappingURL=grupper.js.map