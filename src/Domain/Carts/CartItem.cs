namespace Domain.Carts;

public sealed class CartItem
{
    public Guid ProductId { get; private set; }
    public int Quantity { get; private set; }
    public decimal Price { get; private set; }

    private CartItem() { }
    public CartItem(Guid productId, decimal price, int quantity)
    {
        ProductId = productId;
        Price = price;
        Quantity = quantity;
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
