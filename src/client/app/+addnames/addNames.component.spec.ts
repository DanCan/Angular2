import { Component, provide } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { disableDeprecatedForms, provideForms } from '@angular/forms/index';
import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  HTTP_PROVIDERS
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { NameListService } from '../shared/index';
import { AddNamesComponent } from './addNames.component';

export function main() {
  describe('AddNames component', () => {
    // Disable old forms
    let providerArr: any[];

    beforeEach(() => { providerArr = [disableDeprecatedForms(), provideForms()]; });

    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.overrideProviders(TestComponent, providerArr)
          .createAsync(TestComponent)
          .then((rootTC: any) => {
            rootTC.detectChanges();

            let addNamesInstance = rootTC.debugElement.children[0].componentInstance;
            let addNamesDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(addNamesInstance.nameListService).toEqual(jasmine.any(NameListService));
            expect(getDOM().querySelectorAll(addNamesDOMEl, 'li').length).toEqual(0);

            addNamesInstance.newName = 'Minko';
            addNamesInstance.addName();
            rootTC.detectChanges();

            expect(getDOM().querySelectorAll(addNamesDOMEl, 'li').length).toEqual(1);

            expect(getDOM().querySelectorAll(addNamesDOMEl, 'li')[0].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [
    HTTP_PROVIDERS,
    NameListService,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
  ],
  selector: 'test-cmp',
  template: '<sd-addNames></sd-addNames>',
  directives: [AddNamesComponent]
})
class TestComponent {}
