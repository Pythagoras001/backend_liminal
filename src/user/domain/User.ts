import { Image } from '../../image/domain/Image';

const USER_NAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX_LENGTH = 255;

export class User {
  constructor(
    private readonly id: string | undefined,
    private userName: string,
    private email: string,
    private readonly password: string,
    private readonly createdAt: Date,
    private profileImage: Image | undefined = undefined,
  ) {}

  getId(): string | undefined {
    return this.id;
  }

  getUserName(): string {
    return this.userName;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getProfileImage(): Image | undefined {
    return this.profileImage;
  }

  changeProfileImage(newProfileImage: Image): void {
    this.profileImage = newProfileImage;
  }

  changeUserName(newUserName: string): void {
    if (!USER_NAME_PATTERN.test(newUserName)) {
      throw new Error(
        'userName must be 3-20 characters long and contain only letters, numbers and underscores',
      );
    }

    this.userName = newUserName;
  }

  changeEmail(newEmail: string): void {
    if (newEmail.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(newEmail)) {
      throw new Error('email is not valid');
    }

    this.email = newEmail;
  }
}
