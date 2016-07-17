import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms/index';

import { NameListService } from '../shared/index';

/**
 * This class represents the lazy loaded AddNamesComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-addNames',
  templateUrl: 'addNames.component.html',
  styleUrls: ['addNames.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class AddNamesComponent {

  newName: string;

  /**
   * Creates an instance of the AddNamesComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService) {}

  /**
   * Calls the add method of the NameListService with the current newName value of the form.
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService.add(this.newName);
    this.newName = '';
    return false;
  }

}
