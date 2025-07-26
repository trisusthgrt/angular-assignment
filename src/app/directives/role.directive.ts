import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective implements OnInit {
  @Input() appRole: 'admin' | 'user' | 'all' = 'all';
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateView();
  }

  private updateView() {
    const currentUser = this.authService.getCurrentUser();
    let shouldShow = false;

    switch (this.appRole) {
      case 'admin':
        shouldShow = currentUser?.role === 'admin';
        break;
      case 'user':
        shouldShow = currentUser?.role === 'user';
        break;
      case 'all':
        shouldShow = !!currentUser;
        break;
      default:
        shouldShow = false;
    }

    if (shouldShow && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!shouldShow && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
} 