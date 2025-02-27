using Domain.Abstractions;

namespace Domain.Customers;

public class Customer : AggregateRoot
{
    public string Document { get; private set; }

    public Customer(string document)
    {
        Document = document;
    }

    public static Customer Create(string document)
    {
        return new Customer(document);
    }
}
