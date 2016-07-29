import { Component } from '@angular/core';
import { Control,   } from '@angular/common';
import { AbstractControl, FormGroup, FormBuilder, Validators, FORM_DIRECTIVES, FORM_PROVIDERS, REACTIVE_FORM_DIRECTIVES } from '@angular/forms'
import { Article } from './article.injectable'

@Component({
    selector: 'add-article',
    inputs: ['onAddArticle'],
    styleUrls: ['app/+redditclone/article/article.css'],
  directives:[REACTIVE_FORM_DIRECTIVES],
  providers:[FORM_PROVIDERS],
    template: `
        <form [formGroup]="myForm"
            (ngSubmit)="addArticle(formTitle.control.value, newLink)"
            class="ui large form segment">
            <h3 class="ui header">Add a link</h3>
            <div class="field" *ngIf="true"
                [class.warning]="!formTitle.valid && formTitle.touched">
                <label for="ftitle">Title: </label>
                <input name="ftitle" formControlName="title"/>
            </div>
            <div class="field" *ngIf="true"
                [class.error]="formLink.hasError('invalidHTTP') && formLink.touched">
                <label for="flink">Link: </label>
                <input name="flink" formControlName="link"
                    #newLink/>
            </div>

            <input type="submit"
                    value="Submit link"
                    class="ui positive right floated button"
                    [disabled]="!myForm.valid "/>
        </form>
    `
})
export class AddArticleComponent {
    onAddArticle: Function;
  //TODO: Still not working with the new forms. Somethign with no provider :/
    myForm: FormGroup;
    formLink: AbstractControl;
    formTitle: AbstractControl;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            title: ['', Validators.required],
            link: ['', Validators.compose([
                Validators.required, this.linkValidator
            ])]
        });

      this.formLink = this.myForm.controls['link'];
      this.formTitle = this.myForm.controls['title'];
    }

    linkValidator(control: Control): { [s: string]: boolean } {
        // Checks for either "http://" or 'www.' at the begging of the web address.
        let match = control.value.match(/^(((https?):\/\/)|([w|W]{3,}\.))[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/);
        console.log(control.value+ " Link Validator Matching Value:"+match);
        if (!match) {
            return { invalidHTTP: true }
        }
    }

    addArticle(newTitle: HTMLInputElement, newLink: HTMLInputElement) {
        this.formatHTTPLink(newLink);
        const article = new Article(newTitle.value, newLink.value);
        this.onAddArticle(article);
        newTitle.value = '';
        newLink.value = '';
    }

    private formatHTTPLink(link: HTMLInputElement){
        // Just look "www." at start of the link.
        if (!link.value.match(/^ ([w|W]{3,}\.)/) ) {
                link.value = "http://" + link.value;
        }
    }
}
