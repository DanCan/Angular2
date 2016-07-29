import { Component } from '@angular/core';
import { Control, ControlGroup, FormBuilder, Validators } from '@angular/common';
import { Article } from './article.injectable'

@Component({
    selector: 'add-article',
    inputs: ['onAddArticle'],
    styleUrls: ['app/article/article.css'],
    template: `
        <form [ngFormModel]="myForm"
            (ngSubmit)="addArticle(newTitle, newLink)"
            class="ui large form segment">
            <h3 class="ui header">Add a link</h3>
            <div class="field"
                [class.warning]="!myForm.find('title').valid &&
                myForm.find('title').touched">
                <label for="title">Title: </label>
                <input name="title"
                    #newTitle
                    [ngFormControl]="myForm.controls['title']"/>
            </div>
            <div class="field"
                [class.error]="formLink.control.hasError('invalidHTTP') && formLink.control.touched">
                <label for="link">Link: </label>
                <input name="link"
                    #newLink
                    #formLink="ngForm"
                    [ngFormControl]="myForm.controls['link']"/>
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
    myForm: ControlGroup;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'title': ['', Validators.required],
            'link': ['', Validators.compose([
                Validators.required, this.linkValidator
            ])]
        });
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