import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUer(): string {
    return 'Get User';
  }

  createUser(): string {
    return 'Create User';
  }

  getProfile(): string {
    return 'Get Profile';
  }

  updateUser(): string {
    return 'Update Profile';
  }

  deleteUser(): string {
    return 'Delete Profile';
  }
}
