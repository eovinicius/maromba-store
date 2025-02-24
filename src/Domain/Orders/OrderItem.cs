using Domain.Abstractions;

namespace Domain.Orders;

public sealed class OrderItem : Entity
{
    public Guid ProductId { get; private set; }
    public decimal Price { get; private set; }
    public int Quantity { get; private set; }

    public OrderItem(Guid productId, decimal price, int quantity)
    {
        ProductId = productId;
        Quantity = quantity;
        Price = price;
    }

}
