using Domain.Abstractions;

namespace Domain.Customers;

public class Customer : AggregateRoot
{
    public string Document { get; private set; }
}
