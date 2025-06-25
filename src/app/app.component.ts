import { Component, OnInit } from '@angular/core';
import { PostService, Post } from './post/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  allPosts: Post[] = [];
  tagsToCount = new Map<string, number>();

  selectedTag: string | null = null;

  constructor(private postService: PostService) { }

  onTagSelected(tag: string): void {
    if (this.selectedTag === tag) {
      this.selectedTag = null;
      this.posts = this.allPosts;
    } else {
      this.selectedTag = tag;
      this.posts = this.allPosts.filter(post => post.tags.includes(tag));
    }
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.allPosts = posts;
      this.posts = posts;
      this.calculateTagCounts();
    });
  }

  private calculateTagCounts(): void {
    this.allPosts.forEach(post => {
      post.tags.forEach(tag => {
        const currentCount = this.tagsToCount.get(tag) || 0;
        this.tagsToCount.set(tag, currentCount + 1);
      });
    });
  }
}
