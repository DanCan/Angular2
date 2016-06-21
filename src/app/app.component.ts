import { Component, Injectable } from '@angular/core';

@Injectable()
class Article {
    title: string;
    link: string;
    votes: number;

    constructor( title: string,  link: string, votes?: number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }

    voteUp():void{
        this.votes += 1;
    }

    voteDown(): void {
        this.votes -= 1;
    }

    domain() {
        try{
            const link: string = this.link.split('//')[1];
            return link.split('/')[0];
        } catch (err) {
            return null;
        }
    }
}

@Component({
  selector: 'my-header',
  template: `
  <div class="ui menu">
    <div class="ui container">
      <a href="#" class="header item">
        <img class="logo"
             src="images/ng-book-2-minibook.png"/>
        ng-book 2
      </a>
      <div class="header item borderless">
        <h1 class="ui header">
          Angular 2 reddit clone
        </h1>
      </div>
    </div>
  </div>`
})
class Header { }

@Component({
    selector: 'add-article',
    inputs: ['onAddArticle'],
    template: `
        <form
            (ngSubmit)="addArticle(newTitle, newLink)"
            class="ui large form segment">
            <h3 class="ui header">Add a link</h3>
            <div class="field">
                <label for="title">Title: </label>
                <input name="title"
                    #newTitle/>
            </div>
            <div class="field">
                <label for="link">Link: </label>
                <input name="link"
                    #newLink />
            </div>

            <input type="submit"
                    value="Submit link"
                    class="ui positive right floated button"
                    />
        </form>
    `
})
class AddArticleComponent {
    onAddArticle: Function;

    addArticle(newTitle: HTMLInputElement, newLink: HTMLInputElement) {
        console.log('Adding Call', newTitle.value, newLink);
        const article = new Article(newTitle.value, newLink.value);
        this.onAddArticle(article);
        newTitle.value = '';
        newLink.value = '';
    }
}

@Component({
  selector: 'article-component',
  template: `
  <div class="four wide column center aligned votes">
    <div class="ui statistic">
        <div class="value">{{ article.votes }}</div>
        <div class="label">Points</div>
    </div>
  </div>
  <div class="twelve wide column">
    <a class="ui header large" href="{{ article.link }}">
        {{ article.title }}
    </a>
    <div class="meta">({{ article.domain() }})</div>
    <ul class="ui big horizontal list voters">
        <li class="item">
            <a href (click)="voteUp()">
                <i class="arrow up icon"></i>
                Upvote
            </a>
            <a href (click)="voteDown()">
                <i class="arrow down icon"></i>
                Downvote
            </a>
        </li>
    </ul>
  </div>
  `,
    inputs: ['article'],
    host: {
        class: 'row'
    }
})
class ArticleComponent {
    article: Article;

    voteUp(): boolean {
        this.article.voteUp();

        return false; // Defines whether or not we want the event to keep BUBBLING
    }

    voteDown(): boolean {
        this.article.voteDown();

        return false;
    }
}

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [Header, ArticleComponent, AddArticleComponent],
    providers : [Article]
})
export class AppComponent {
    // For testing purposes when I get to it
    title: string = 'app works!';

    // Real data
    articles: Article [];
    onAddArticleCallback: Function;

    constructor() {
        this.articles =[
            new Article( 'ng-newsletter',
                'http://ng-newsletter.com'),
            new Article( 'ng-book2',
                'http://ng-book.com/2'),
            new Article( 'Google',
                'http://google.com')
        ];

        this.onAddArticleCallback =
            this.onAddArticle.bind(this);

    }

    onAddArticle(article: Article):void {
        console.log('onAddArticle called', article);
        this.articles.push(article);
    }

    sortedArticles(): Article[] {
        // Compare a to b to tell the sorting function where a lies
        // a < b then return number less than 0
        // a > b then return number greater than 0
        // a and b equal then reutrn 0
        return this.articles.sort( (a: Article, b: Article) =>
            b.votes - a.votes
        );
    }
}
