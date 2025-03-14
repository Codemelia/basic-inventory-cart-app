import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LineItem } from '../models/line-item.model';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

  lineItem!: LineItem
  
  @Output()
  lineItemAdded = new EventEmitter<LineItem>() // emits added item to app.component.ts

  add($event: any) {
    const row: HTMLElement = $event.target.closest('tr')
    console.log('>>> Extracted from event: ', row)

    const cells: HTMLCollectionOf<HTMLElement> = row.getElementsByTagName('td')
    console.log('>>> Extracted table columns: ', cells)

    // construct new line item
    this.lineItem = {
      image: cells[0].querySelector('img')?.src || '', // get image src, default to '' if null
      item: cells[1].textContent?.trim() || '', // get item name, default to '' if null
      quantity: 1 // set quantity to 1
    }
    console.log('>>> Adding line item: ', this.lineItem)

    // emit new line item to parent component
    this.lineItemAdded.emit(this.lineItem) 
  }

}
