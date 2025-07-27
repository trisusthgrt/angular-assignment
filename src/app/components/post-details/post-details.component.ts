import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, DateFormatPipe],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  post: Post | undefined;
  currentUser: User | null = null;
  author: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit() {
    // Guard ensures user is authenticated, so we can safely get current user
    this.currentUser = this.authService.getCurrentUser();
    
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.post = this.postService.getPostById(postId);
    
    if (!this.post) {
      this.router.navigate(['/posts']);
      return;
    }

    this.author = this.authService.getAllUsers().find(u => u.id === this.post!.authorId);
  }

  goBack() {
    this.router.navigate(['/posts']);
  }

  deletePost() {
    if (this.post && confirm('Are you sure you want to delete this post?')) {
      if (this.postService.deletePost(this.post.id)) {
        this.router.navigate(['/posts']);
      }
    }
  }

  canDelete(): boolean {
    return this.post?.authorId === this.currentUser?.id;
  }
} 