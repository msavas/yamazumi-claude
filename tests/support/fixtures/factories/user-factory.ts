import { faker } from '@faker-js/faker';

/**
 * User Factory
 *
 * Generates random user data using @faker-js/faker with automatic cleanup.
 * Supports override patterns for specific test scenarios.
 *
 * Pattern: Factory with auto-cleanup, faker for random data, override support
 *
 * Usage:
 * ```typescript
 * const factory = new UserFactory();
 * const user = await factory.createUser();
 * const adminUser = await factory.createUser({ role: 'admin' });
 * await factory.cleanup(); // Called automatically by fixture
 * ```
 *
 * @see .bmad/bmm/testarch/knowledge/data-factories.md
 */

export interface User {
  id?: string;
  email: string;
  name: string;
  password: string;
  role?: 'user' | 'admin';
}

export class UserFactory {
  private createdUsers: string[] = [];

  /**
   * Create a user with random data (override specific fields as needed)
   */
  async createUser(overrides: Partial<User> = {}): Promise<User> {
    const user: User = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password({ length: 12 }),
      role: 'user',
      ...overrides,
    };

    // TODO: Implement API call to create user when backend is ready
    // Example:
    // const response = await fetch(`${process.env.API_URL}/api/users`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(user),
    // });
    // const created = await response.json();
    // this.createdUsers.push(created.id);
    // return created;

    // For now, return mock user (will be replaced with real API call)
    const mockUser = { ...user, id: faker.string.uuid() };
    this.createdUsers.push(mockUser.id!);
    return mockUser;
  }

  /**
   * Create multiple users with random data
   */
  async createUsers(count: number): Promise<User[]> {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      users.push(await this.createUser());
    }
    return users;
  }

  /**
   * Auto-cleanup: Delete all created users
   * Called automatically by fixture teardown
   */
  async cleanup(): Promise<void> {
    // TODO: Implement API call to delete users when backend is ready
    // Example:
    // for (const userId of this.createdUsers) {
    //   await fetch(`${process.env.API_URL}/api/users/${userId}`, {
    //     method: 'DELETE',
    //   });
    // }

    this.createdUsers = [];
  }
}
