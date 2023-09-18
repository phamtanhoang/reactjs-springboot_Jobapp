class JobModel {
  id: string;
  title: string;
  description: string;
  salary: string;
  fromDate: string;
  toDate: string;
  address: string;
  categoryId: string;
  employerId: string;
  state: string;
  constructor(
    id: string,
    title: string,
    description: string,
    salary: string,
    fromDate: string,
    toDate: string,
    address: string,
    categoryId: string,
    employerId: string,
    state: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.salary = salary;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.address = address;
    this.categoryId = categoryId;
    this.employerId = employerId;
    this.state = state;
  }
  
}

export default JobModel;
