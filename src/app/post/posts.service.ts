import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

declare var require: any;
const fm = require('front-matter');

interface FrontMatterAttributes {
    title: string;
    date: string;
    tags: string[];
}

export interface Post {
    title: string;
    date: string;
    tags: string[];
    content: string;
    filename: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {

    private postFilenames = ['example.md', 'example-two.md', 'example-three.md'];

    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        const requests = this.postFilenames.map(filename =>
            this.http.get(`assets/posts/${filename}`, { responseType: 'text' }).pipe(
                map(md => {
                    const parsed = fm(md) as { attributes: FrontMatterAttributes; body: string };
                    return {
                        ...parsed.attributes,
                        content: parsed.body,
                        filename,
                    };
                })
            )
        );
        return forkJoin(requests);
    }
}
