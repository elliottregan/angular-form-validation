import { Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { CardComponent } from '../../components/card/card.component';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}

/**
 * Demonstrates Angular's Resource API (httpResource) for reactive data fetching.
 *
 * Key features shown:
 * - httpResource for declarative HTTP requests
 * - Automatic refetching when signal dependencies change
 * - Loading, error, and success states via signals
 * - Integration with Angular's signal-based reactivity
 */
@Component({
  selector: 'app-resource-demo-page',
  standalone: true,
  imports: [FormsModule, PageHeaderComponent, CardComponent],
  templateUrl: './resource-demo.page.html',
  styleUrl: './resource-demo.page.scss',
})
export class ResourceDemoPage {
  /** Currently selected user ID - changing this triggers a refetch */
  userId = signal(1);

  /** Available user IDs for selection */
  userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  /**
   * httpResource automatically:
   * - Tracks signal dependencies (userId)
   * - Refetches when userId changes
   * - Provides loading/error/value signals
   * - Integrates with HttpClient interceptors
   */
  userResource = httpResource<User>(() => ({
    url: `https://jsonplaceholder.typicode.com/users/${this.userId()}`,
    method: 'GET',
  }));

  /** Resource for fetching all users */
  allUsersResource = httpResource<User[]>(() => ({
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'GET',
  }));

  /**
   * Updates the selected user ID, which automatically triggers
   * the userResource to refetch due to signal reactivity.
   */
  selectUser(id: number): void {
    this.userId.set(id);
  }

  /**
   * Manually reload the current user data.
   */
  reloadUser(): void {
    this.userResource.reload();
  }
}
