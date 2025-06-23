import { Component, OnInit } from '@angular/core';
import { PostService, Post } from './post/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  tagsToCount = new Map<string, number>();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.calculateTagCounts();
    });
  }

  private calculateTagCounts(): void {
    this.posts.forEach(post => {
      post.tags.forEach(tag => {
        const currentCount = this.tagsToCount.get(tag) || 0;
        this.tagsToCount.set(tag, currentCount + 1);
      });
    });
  }
}
