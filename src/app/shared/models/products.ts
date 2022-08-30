export class Products {
  constructor(
    public id: number,
    public parcode: string,
    public product_name: string,
    public code: string,
    public buy_price: number,
    public sell_price: number,
    public amount: number,
    public shelf_name_or_number: string,
    public trader_name: number,
    public thumbnail: string,
    public date: Date
  ) {}
}
