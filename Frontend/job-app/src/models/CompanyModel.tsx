class CompanyModel {
    id: number;
    name: string;
    description?: string;
    img?: string;

    constructor (id: number, name: string, description: string,  img: string) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.img = img;
    }
}

export default CompanyModel;