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
  active: boolean;
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
    active: boolean
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
    this.active = active;
  }
  
}

export default JobModel;
