export class AuthResponseDto {
  id: number;
  name: string;
  email: string;
  token: string;
  refresh_token: string;

  constructor({ id, name, email, token, refresh_token }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = token;
    this.refresh_token = refresh_token;
  }
}
