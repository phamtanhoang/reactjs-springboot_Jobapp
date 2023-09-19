class AccountModel {
  id: string;
  createdAt: string;
  state: string;
  role: string;
  email: string;
  password: string;

  constructor(
    id: string,
    createAt: string,
    state: string,
    role: string,
    email: string,
    password: string
  ) {
    this.id = id;
    this.createdAt = createAt;
    this.state = state;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}

export default AccountModel;
