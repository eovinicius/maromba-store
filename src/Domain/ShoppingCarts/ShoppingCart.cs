using Domain.Abstractions;
using Domain.Products;

namespace Domain.ShoppingCarts;

public sealed class ShoppingCart : AggregateRoot
{
    public Guid CustomerId { get; private set; }
    private readonly List<ShoppingCartItem> _items;
    public IReadOnlyCollection<ShoppingCartItem> Items => _items.ToList();
    public DateTime CreatedAt { get; private set; }

    private ShoppingCart() { }

    public ShoppingCart(Guid customerId)
    {
        CustomerId = customerId;
        _items = [];
        CreatedAt = DateTime.Now;
    }

    public static ShoppingCart Create(Guid customerId)
    {
        return new ShoppingCart(customerId);
    }

    public void AddItem(Product product, int quantity)
    {
        var existingItem = _items.FirstOrDefault(item => item.ProductId == product.Id);
        if (existingItem != null)
        {
            existingItem.IncreaseQuantity(quantity);
        }
        else
        {
            _items.Add(new ShoppingCartItem(product.Id, product.Price, quantity));
        }
    }

    public decimal GetTotal()
    {
        return _items.Sum(item => item.Price * item.Quantity);
    }

    public void RemoveItem(Guid productId)
    {
        _items.RemoveAll(item => item.ProductId == productId);
    }

    public void Clear()
    {
        _items.Clear();
    }

    public void AddQuantity(Guid productId, int quantity)
    {
        var item = _items.First(item => item.ProductId == productId);
        item.UpdateQuantity(item.Quantity + quantity);
    }
}