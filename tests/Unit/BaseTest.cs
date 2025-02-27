using Bogus;

using Domain.Abstractions;

namespace Unit;

public abstract class BaseTest
{
    protected static readonly Faker Faker = new();

    public static T AssertDomainEventWasPublished<T>(AggregateRoot aggregate)
        where T : IDomainEvent
    {
        T? domainEvent = aggregate.DomainEvents.OfType<T>().SingleOrDefault();

        if (domainEvent is null)
        {
            throw new Exception($"{typeof(T).Name} was not published");
        }

        return domainEvent;
    }
}