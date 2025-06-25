import { Component, Input } from '@angular/core';
import { Post } from './posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: false
})
export class PostComponent {
  @Input() post!: Post


}
