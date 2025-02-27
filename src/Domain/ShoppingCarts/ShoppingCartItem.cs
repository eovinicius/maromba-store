using Domain.Abstractions;

namespace Domain.ShoppingCarts;

public sealed class ShoppingCartItem : Entity
{
    public Guid ProductId { get; private set; }
    public int Quantity { get; private set; }
    public decimal UnitPrice { get; private set; }
    public decimal Price { get; private set; }

    private ShoppingCartItem() { }
    public ShoppingCartItem(Guid productId, decimal unitPriceunit, int quantity)
    {
        ProductId = productId;
        UnitPrice = unitPriceunit;
        Quantity = quantity;
        Price = UnitPrice * Quantity;
    }

    public void IncreaseQuantity(int quantity)
    {
        Quantity += quantity;
    }

    public void DecreaseQuantity(int quantity)
    {
        Quantity -= quantity;
    }

    public void UpdateQuantity(int quantity)
    {
        Quantity = quantity;
    }

}
