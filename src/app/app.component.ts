import { Component, Output } from '@angular/core';
import { LineItem } from './models/line-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  @Output()
  lineItems: LineItem[] = [] // empty array to hold items

  // takes in line item from inventory.component.ts
  // when add button is clicked
  onLineItemAdded(lineItem: LineItem) {

    // search existing line items list for newly added line item
    // find searches through array, tries to find match between existing item name and newly added item name
    // returns line item that matches
    console.log('>>> Received add request, trying to match item with existing items...')
    const existingLI = this.lineItems.find(li => li.item === lineItem.item)
    
    // if line items already have line item that was added
    // no need to do a new array if updating properties only
    // but if adding item to existing array, create new array using spread ops
    if (existingLI) {
      existingLI.quantity += lineItem.quantity // set the quantity to the sum of both
      console.log('>>> Updated total quantity of existing line item: ', existingLI.quantity)

    } else { // if line item added is new
      this.lineItems = [
        ...this.lineItems, // spread op to add existing line items
        lineItem // add the newly added line item to existing list
      ] 
      console.log('>>> Added new line item to existing line items: ', this.lineItems)
    }

  }

  onLineItemRemoved(lineItem: LineItem) {

    // search existing line item to remove in existing list
    console.log('>>> Received remove request, trying to find item in existing items...')
    const existingLI = this.lineItems.find(li => li.item === lineItem.item)

    // if line item to be removed does not exist, log error
    if (!existingLI) {
      console.error('>>> Received item does not exist in existing line items')

    } else { // if item to remove exists
      
      // if existing li quantity more than 1, -1 from quantity
      if (existingLI.quantity > 1) {
        existingLI.quantity += lineItem.quantity // quantity is already set to -1 in li to remove
        console.log('>>> Updated total quantity of existing line item: ', existingLI.quantity)
      } else { // if existing li quantity = 0, filter list to only include items that are not to be removed
        this.lineItems = this.lineItems.filter(li => li.item !== lineItem.item)
      }

    }

  }

}
