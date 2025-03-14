import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { LineItem } from '../models/line-item.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnChanges {

  @Input()
  lineItems!: LineItem[] // takes in line items array from parent component

  @Output()
  lineItemRemoved = new EventEmitter<LineItem>()

  lineItem!: LineItem // line item to remove

  // detects changes on cart
  ngOnChanges(changes: SimpleChanges): void {
    console.log('>>> Change detected: ', changes)
  }

  // remove line item from cart
  remove($event: any) {
    const row: HTMLElement = $event.target.closest('tr') // get row
    console.log('>>> Extracted from event: ', row)

    const cells: HTMLCollectionOf<HTMLElement> = row.getElementsByTagName('td') // get column
    console.log('>>> Extracted table columns: ', cells)

    this.lineItem = {
      image: cells[0].querySelector('img')?.src || '', // get img content, default to empty string if null
      item: cells[1].textContent?.trim() || '', // get item content, default to empty string if null
      quantity: -1 // set to -1
    }
    console.log('>>> Removing line item: ', this.lineItem)

    // emit line item to parent component
    this.lineItemRemoved.emit(this.lineItem)
  }

}
