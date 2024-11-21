export class ProductDto {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = Number(data.price);
    }

    static fromEntity(entity) {
        return new ProductDto(entity);
    }
}