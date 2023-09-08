class JobModel {
  id: string;
  name: string;
  address: string;
  description: string;
  image: string;
  email: string;
  password: string;
  active: boolean;
  constructor(
    id: string,
    name: string,
    address: string,
    description: string,
    image: string,
    email: string,
    password: string,
    active: boolean
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.description = description;
    this.image = image;  
    this.email = email;
    this.password = password;
    this.active = active;
  }
}

export default JobModel;
