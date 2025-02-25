using Domain.Products;

namespace Domain.Carts;

public sealed class Cart
{
    public Guid Id { get; private set; }
    public Guid CustomerId { get; private set; }
    public List<CartItem> Itens { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public Cart(Guid customerId)
    {
        Id = Guid.NewGuid();
        CustomerId = customerId;
        Itens = [];
        CreatedAt = DateTime.Now;
    }

    public static Cart Create(Guid customerId)
    {
        return new Cart(customerId);
    }

    public void AddItem(Product product, int quantity)
    {
        Itens.Add(new CartItem(product.Id, product.Price, quantity));
    }

    public decimal GetTotal()
    {
        return Itens.Sum(item => item.Price * item.Quantity);
    }

    public void RemoveItem(Guid productId)
    {
        Itens.RemoveAll(item => item.ProductId == productId);
    }

    public void Clear()
    {
        Itens.Clear();
    }

    public void AddQuantity(Guid productId, int quantity)
    {
        var item = Itens.First(item => item.ProductId == productId);
        item.UpdateQuantity(item.Quantity + quantity);
    }
}