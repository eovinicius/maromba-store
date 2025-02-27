using Domain.Coupons;
using Domain.Customers;
using Domain.Orders;
using Domain.Products;


namespace Unit.Domain.Orders;

public class OrderTest
{
    [Fact]
    public void Deveria_criar_uma_instancia_de_compra()
    {
        var customer = Customer.Create("");
        var order = Order.Create(customer);

        Assert.NotNull(order);
    }

    [Fact]
    public void Deveria_adicionar_um_item_no_pedido()
    {
        var customer = Customer.Create("");
        var order = Order.Create(customer);

        var product = Product.Create("", 10);
        order.AddItem(product, 1);

        Assert.Single(order.Items);
    }

    [Fact]
    public void Deveria_aplicar_um_cupom_de_desconto_no_pedido()
    {
        var customer = Customer.Create("");
        var order = Order.Create(customer);

        var product = Product.Create("", 10);
        order.AddItem(product, 1);

        var coupon = Coupon.Create("10OFF", 10, DateTime.Now.AddDays(1), true);
        order.ApplyCupom(coupon);

        Assert.Equal(9, order.GetTotal());
    }
}
