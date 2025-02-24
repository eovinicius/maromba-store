using Domain.Abstractions;

namespace Domain.Orders;

public class OrderCoupon : ValueObject
{

    public string Code { get; private set; }
    public decimal Percentage { get; private set; }

    public OrderCoupon(string code, decimal percentage)
    {
        Code = code;
        Percentage = percentage;
    }

    public decimal CalculeteDiscount(decimal total)
    {
        return total * Percentage / 100;
    }
}
