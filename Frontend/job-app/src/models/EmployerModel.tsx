class EmployerModel {
  id: string;
  name: string;
  address: string;
  description: string;
  image: string;
  banner: string;
  accountId: string;
  constructor(
    id: string,
    name: string,
    address: string,
    description: string,
    image: string,
    banner: string,
    accountId: string
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.description = description;
    this.image = image;
    this.banner=banner;
    this.accountId = accountId;
  }
}

export default EmployerModel;
