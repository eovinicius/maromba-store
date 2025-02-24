using Domain.Abstractions;

namespace Domain.Products;

public class Product : AggregateRoot
{
    public string Name { get; private set; }
    public decimal Price { get; private set; }
}
