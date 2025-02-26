namespace Domain.Orders;

public enum OrderStatus
{
    Created,
    Paid,
    Canceled,
    Refunded,
    Delivered,
    Finished
}
