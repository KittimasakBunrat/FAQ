import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'grupper' })
export class Grupper implements PipeTransform {
    transform(list: Array<any>, tekst: string): Array<any> {

        const gruppering = list.reduce((prev, cur) => {
            if (!prev[cur[tekst]]) {
                prev[cur[tekst]] = [cur];
            } else {
                prev[cur[tekst]].push(cur);
            }
            return prev;
        }, {});
        return Object.keys(gruppering).map(key => ({ key, value: gruppering[key] }));
    }
}