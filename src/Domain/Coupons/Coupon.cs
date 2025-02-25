using Domain.Abstractions;

namespace Domain.Coupons;

public sealed class Coupon : AggregateRoot
{
    public string Code { get; private set; }
    public decimal Percentage { get; private set; }
    public DateTime ExpireDate { get; private set; }
    public bool Active { get; private set; }

    public Coupon(string code, decimal percentage, DateTime expireDate, bool active)
    {
        Code = code;
        Percentage = percentage;
        ExpireDate = expireDate;
        Active = active;
    }

    public bool IsValid() => Active && !IsExpired();

    private bool IsExpired() => DateTime.Now > ExpireDate;
}
