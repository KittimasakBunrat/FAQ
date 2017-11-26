import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'search' })
export class Search implements PipeTransform {
    transform(categories: any, searchText: any): any {
        if (searchText == null) return categories;

        return categories.filter(function (category: any) {
            return category.sporsmal.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        })
    }
}