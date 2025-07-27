import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { RoleDirective } from '../../directives/role.directive';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule, DateFormatPipe, RoleDirective],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  currentUser: User | null = null;
  filterType: 'all' | 'my' = 'all';
  showCreateForm = false;
  newPost = {
    title: '',
    content: ''
  };

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    // Guard ensures user is authenticated, so we can safely get current user
    this.currentUser = this.authService.getCurrentUser();
    this.loadPosts();
  }

  loadPosts() {
    this.posts = this.postService.getAllPosts();
    this.applyFilter();
  }

  applyFilter() {
    if (this.filterType === 'my') {
      this.filteredPosts = this.postService.getPostsByAuthor(this.currentUser!.id);
    } else {
      this.filteredPosts = [...this.posts];
    }
  }

  onFilterChange() {
    this.applyFilter();
  }

  createPost() {
    if (this.newPost.title.trim() && this.newPost.content.trim()) {
      const post = this.postService.createPost({
        title: this.newPost.title,
        content: this.newPost.content,
        authorId: this.currentUser!.id
      });
      
      this.newPost = { title: '', content: '' };
      this.showCreateForm = false;
      this.loadPosts();
    }
  }

  viewPost(postId: number) {
    this.router.navigate(['/posts', postId]);
  }

  deletePost(postId: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      if (this.postService.deletePost(postId)) {
        this.loadPosts();
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getAuthorName(authorId: number): string {
    const user = this.authService.getAllUsers().find(u => u.id === authorId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown Author';
  }
} 