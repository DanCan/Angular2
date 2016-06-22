import { Injectable } from '@angular/core';


@Injectable()
export class Article {
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
            let temp = this.link.split('//')[1];
            const link: string = !temp ? this.link : temp;
            return link.split('/')[0];
        } catch (err) {
            return null;
        }
    }
}
