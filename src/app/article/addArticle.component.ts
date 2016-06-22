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
                [class.error]="!myForm.find('link').valid && myForm.find('link').touched">
                <label for="link">Link: </label>
                <input name="link"
                    #newLink
                    [ngFormControl]="myForm.controls['link']"/> {{myForm.find('link').hasError('invalid')}}
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
        console.log(!control.value.match(/^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/));
        if (!control.value.match(/^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/)) {
            return { invalid: true }
        }
    }

    addArticle(newTitle: HTMLInputElement, newLink: HTMLInputElement) {
        console.log('Adding Call', this.myForm.value);
        this.formatHTTPLink(newLink);
        const article = new Article(newTitle.value, newLink.value);
        this.onAddArticle(article);
        newTitle.value = '';
        newLink.value = '';
    }

    private formatHTTPLink(link: HTMLInputElement){
        if (!link.value.match(/^((https?):\/\/)/)) {
            link.value = 'http://'+link.value;
        }
    }
}