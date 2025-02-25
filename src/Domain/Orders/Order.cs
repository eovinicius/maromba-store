using Domain.Abstractions;
using Domain.Coupons;
using Domain.Products;

namespace Domain.Orders;

public sealed class Order : AggregateRoot
{
    public Guid CustomerId { get; private set; }
    public List<OrderItem> Itens { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public OrderCoupon? OrderCoupon { get; private set; }
    public StatusOrder Status { get; private set; }

    private Order() { }
    public Order(Guid customerId, List<OrderItem> itens, DateTime createdAt, StatusOrder status, OrderCoupon? coupon = null)
    {
        CustomerId = customerId;
        Itens = itens;
        CreatedAt = createdAt;
        OrderCoupon = coupon;
        Status = status;
    }

    public static Order Create(Guid customerId)
    {
        return new Order(customerId, [], DateTime.Now, StatusOrder.Created);
    }

    public decimal GetTotal()
    {
        var total = Itens.Sum(item => item.Price * item.Quantity);
        if (OrderCoupon != null)
        {
            total -= OrderCoupon.CalculeteDiscount(total);
        }
        return total;
    }

    public void AddItem(Product product, int quantity)
    {
        Itens.Add(new OrderItem(product.Id, product.Price, quantity));
    }

    public void ApplyCupom(Coupon coupon)
    {
        if (!coupon.IsValid())
        {
            throw new Exception("Cupom expirado ou inválido");
        }
        OrderCoupon = new OrderCoupon(coupon.Code, coupon.Percentage);
    }
}
