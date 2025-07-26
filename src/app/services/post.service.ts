import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      title: "Welcome to the App",
      content: "This is the first post in our Angular application.",
      authorId: 1,
      createdAt: "2024-06-01T10:00:00Z"
    },
    {
      id: 2,
      title: "Angular Tips",
      content: "Here are some useful tips for working with Angular.",
      authorId: 2,
      createdAt: "2024-06-02T14:30:00Z"
    }
  ];

  constructor() { }

  getAllPosts(): Post[] {
    return [...this.posts];
  }

  getPostsByAuthor(authorId: number): Post[] {
    return this.posts.filter(post => post.authorId === authorId);
  }

  getPostById(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  createPost(post: Omit<Post, 'id' | 'createdAt'>): Post {
    const newId = Math.max(...this.posts.map(p => p.id)) + 1;
    const newPost: Post = {
      ...post,
      id: newId,
      createdAt: new Date().toISOString()
    };
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(id: number, updates: Partial<Post>): boolean {
    const index = this.posts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.posts[index] = { ...this.posts[index], ...updates };
      return true;
    }
    return false;
  }

  deletePost(id: number): boolean {
    const index = this.posts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }
} 