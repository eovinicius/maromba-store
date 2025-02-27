using Domain.Abstractions;

namespace Domain.Products;

public sealed class Product : AggregateRoot
{
    public string Name { get; private set; }
    public decimal Price { get; private set; }

    public Product(string name, decimal price)
    {
        Name = name;
        Price = price;
    }

    public static Product Create(string name, decimal price)
    {
        return new Product(name, price);
    }
}
