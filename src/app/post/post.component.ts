import { Component, Input, OnInit } from '@angular/core';
import { Post } from './posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: false
})
export class PostComponent implements OnInit {
  @Input() post!: Post

  constructor() { }

  ngOnInit(): void {
    console.log(this.post)
  }
}
