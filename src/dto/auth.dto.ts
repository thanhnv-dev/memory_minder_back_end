export class AuthResponseDto {
  id: number;
  name: string;
  email: string;
  token: string;
  refreshToken: string;

  constructor({ id, name, email, token, refreshToken }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
