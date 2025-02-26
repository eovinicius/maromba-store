namespace Domain.Orders.States;

public class CreateOrderState : IOrderState
{
    public void ProcessOrder(Order order)
    {
        order.SetStatus(OrderStatus.Created);
    }
    public void DeliverOrder(Order order)
    {
        throw new NotImplementedException();
    }
    public void ShipOrder(Order order)
    {
        throw new NotImplementedException();
    }
}
