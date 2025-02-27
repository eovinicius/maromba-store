using Domain.Abstractions;
using Domain.Coupons;
using Domain.Customers;
using Domain.Products;

namespace Domain.Orders;

public sealed class Order : AggregateRoot
{
    public Guid CustomerId { get; private set; }
    public OrderCoupon? OrderCoupon { get; private set; }
    public OrderStatus Status { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public decimal TotalPrice { get; private set; }
    private readonly List<OrderItem> _items;
    public IReadOnlyCollection<OrderItem> Items => _items.ToList();

    private Order() { }
    public Order(Guid customerId, List<OrderItem> orderItems, DateTime createdAt, OrderStatus status, OrderCoupon? coupon = null)
    {
        CustomerId = customerId;
        _items = orderItems;
        CreatedAt = createdAt;
        OrderCoupon = coupon;
        Status = status;
    }

    public static Order Create(Customer customer)
    {
        return new Order(customer.Id, [], DateTime.Now, OrderStatus.Created);
    }

    public decimal GetTotal()
    {
        var total = _items.Sum(item => item.Price * item.Quantity);
        if (OrderCoupon != null)
        {
            total -= OrderCoupon.CalculeteDiscount(total);
        }
        return total;
    }

    public void AddItem(Product product, int quantity)
    {
        _items.Add(new OrderItem(product.Id, product.Price, quantity));
        TotalPrice = _items.Sum(item => item.Price);
    }

    public void ApplyCupom(Coupon coupon)
    {
        if (!coupon.IsValid())
        {
            throw new Exception("Cupom expirado ou inválido");
        }
        OrderCoupon = new OrderCoupon(coupon.Code, coupon.Percentage);
    }

    public void SetStatus(OrderStatus status)
    {
        Status = status;
    }
}
