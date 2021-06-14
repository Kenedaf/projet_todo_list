import { Injectable, Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterContact'
})
export class FilterContactPipe implements PipeTransform {
/*
  transform(products: any[], field : string, value : string[]): any[] {  
    if (!products) return [];   
    if (!value) return products;     
    return products.filter((pr: any) => {
        return value.indexOf(pr[field]) > -1
    });
}*/
transform(items: any[], value: string, label:string): any[] {
  if (!items) return [];
  if (!value) return  items;
  if (value == '' || value == null) return [];
  return items.filter(e => e[label].toLowerCase().indexOf(value)=== 0);
 
  
}
}
