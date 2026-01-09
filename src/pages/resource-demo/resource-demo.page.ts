import { Component, signal, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
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

/** GraphQL-style error object */
interface GraphQLError {
  message: string;
  path?: string[];
  extensions?: {
    code: string;
    [key: string]: unknown;
  };
}

/** Apollo-style GraphQL response */
interface GraphQLResponse<T> {
  data: T | null;
  errors: GraphQLError[];
}

/**
 * Demonstrates Angular's Resource API (httpResource) for reactive data fetching.
 *
 * Key features shown:
 * - httpResource for declarative HTTP requests
 * - Automatic refetching when signal dependencies change
 * - Loading, error, and success states via signals
 * - Integration with Angular's signal-based reactivity
 * - GraphQL Apollo-style response handling
 */
@Component({
  selector: 'app-resource-demo-page',
  standalone: true,
  imports: [FormsModule, JsonPipe, PageHeaderComponent, CardComponent],
  templateUrl: './resource-demo.page.html',
  styleUrl: './resource-demo.page.scss',
})
export class ResourceDemoPage {
  /** Currently selected user ID - changing this triggers a refetch */
  userId = signal(1);

  /** When true, requests will fail with 404 */
  simulateError = signal(false);

  /** Available user IDs for selection */
  userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  /**
   * httpResource automatically:
   * - Tracks signal dependencies (userId, simulateError)
   * - Refetches when any dependency changes
   * - Provides loading/error/value signals
   * - Integrates with HttpClient interceptors
   */
  userResource = httpResource<User>(() => ({
    url: this.simulateError()
      ? `https://jsonplaceholder.typicode.com/users/${this.userId()}/invalid`
      : `https://jsonplaceholder.typicode.com/users/${this.userId()}`,
    method: 'GET',
  }));

  /**
   * GraphQL Apollo-style resource that returns { data, errors } format.
   * This simulates how a real GraphQL API would return errors in the response body
   * rather than as HTTP errors.
   *
   * Uses the `parse` option to transform the raw response into Apollo format.
   */
  apolloResource = httpResource<GraphQLResponse<User>>(() => {
    const errorMode = this.simulateError();
    return {
      url: `https://jsonplaceholder.typicode.com/users/${this.userId()}`,
      method: 'GET',
      // Parse transforms the successful HTTP response into Apollo format
      parse: (response: unknown): GraphQLResponse<User> => {
        if (errorMode) {
          // Simulate GraphQL error response (HTTP 200 but with errors array)
          return {
            data: null,
            errors: [
              {
                message: `User with ID ${this.userId()} could not be fetched`,
                path: ['user'],
                extensions: {
                  code: 'USER_NOT_FOUND',
                  userId: this.userId(),
                },
              },
            ],
          };
        }
        // Successful response wraps data in Apollo format
        return {
          data: response as User,
          errors: [],
        };
      },
    };
  });

  /** Resource for fetching all users */
  allUsersResource = httpResource<User[]>(() => ({
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'GET',
  }));

  /** Computed state summary for debugging display */
  resourceState = computed(() => ({
    simulateError: this.simulateError(),
    status: this.userResource.status(),
    isLoading: this.userResource.isLoading(),
    hasValue: this.userResource.hasValue(),
    value: this.userResource.value(),
    error: this.userResource.error(),
  }));

  /** Computed state for Apollo-style resource */
  apolloState = computed(() => ({
    status: this.apolloResource.status(),
    isLoading: this.apolloResource.isLoading(),
    hasValue: this.apolloResource.hasValue(),
    // The value IS the full GraphQL response with data and errors
    response: this.apolloResource.value(),
    // Convenience accessors for the nested values
    data: this.apolloResource.value()?.data ?? null,
    errors: this.apolloResource.value()?.errors ?? [],
    hasErrors: (this.apolloResource.value()?.errors?.length ?? 0) > 0,
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

  /**
   * Toggles error simulation mode.
   * When enabled, requests will fail with 404.
   * This demonstrates how the resource handles errors for the same user ID.
   */
  toggleErrorMode(): void {
    this.simulateError.update(v => !v);
  }
}
