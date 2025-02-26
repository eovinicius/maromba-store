using Domain.Abstractions;

namespace Domain.Users;

public class User : AggregateRoot
{
    public  string Name { get; private set; }
    public string CPF { get; private set; }
    public string Address { get; private set; }
    public  string Email { get; private set; }
    public  string Password { get; private set; }
    public  DateTime CreatedAt { get; private set; }
    public  DateTime UpdatedAt { get; private set; }

    private User() { }

    public User(string name, string email, string password, DateTime createdAt, DateTime updatedAt)
    {
        Name = name;
        Email = email;
        Password = password;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
    }

    public static User Create(string name, string email, string password)
    {
        return new User(name, email, password, DateTime.Now, DateTime.Now);
    }   

    public void Update(string name, string email, string password)
    {
        Name = name;
        Email = email;
        Password = password;
        UpdatedAt = DateTime.Now;
    }

    public void ChangePassword(string password)
    {
        Password = password;
        UpdatedAt = DateTime.Now;
    }
}
