// ProductsController.cs
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Product>> Get()
    {
        try
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error fetching products: {ex}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id}")]
    public Product Get(int id)
    {
        return _context.Products.Find(id);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Product product)
    {
        _context.Products.Add(product);
        _context.SaveChanges();
        return Ok(product);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Product product)
    {
        var existingProduct = _context.Products.Find(id);
        if (existingProduct == null)
        {
            return NotFound();
        }

        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
        existingProduct.Description = product.Description;

        _context.SaveChanges();
        return Ok(existingProduct);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var product = _context.Products.Find(id);
        if (product == null)
        {
            return NotFound();
        }

        _context.Products.Remove(product);
        _context.SaveChanges();
        return Ok(product);
    }
}