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
            let wwwTemp = this.link.split(/\.(.+)?/)[1];
            let httpTemp = this.link.split('//')[1];

            // Is a "www." address
            if (!httpTemp){
                httpTemp = wwwTemp;
            } else if (httpTemp.indexOf("www.") != -1) {    // Is a "http://www." address
                httpTemp = wwwTemp;
            }
            // Trust it is a "http://" address
            // Or wwwTemp was messed and we just take the original link.
            const link: string = !wwwTemp ? this.link : httpTemp;

            return link.split('/')[0];
        } catch (err) {
            return null;
        }
    }
}
