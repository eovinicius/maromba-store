namespace Domain.Orders.States;

public interface IOrderState
{
    void ProcessOrder(Order order);
    void ShipOrder(Order order);
    void DeliverOrder(Order order);
}
