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
    public ActionResult<ApiResponse<IEnumerable<Product>>> Get()
    {
        try
        {
            var products = _context.Products.ToList();
            return Ok(ApiResponse.Success(products));
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error fetching products: {ex}");
            return StatusCode(500, ApiResponse.Error<IEnumerable<Product>>("Internal server error"));
        }
    }

    [HttpGet("{id}")]
    public ActionResult<ApiResponse<Product>> Get(int id)
    {
        var product = _context.Products.Find(id);
        if (product == null)
        {
            return NotFound(ApiResponse.Error<Product>("Product not found"));
        }

        return Ok(ApiResponse.Success(product));
    }

    [HttpPost]
    public IActionResult Post([FromBody] Product product)
    {
        _context.Products.Add(product);
        _context.SaveChanges();
        return Ok(ApiResponse.Success(product));
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Product product)
    {
        var existingProduct = _context.Products.Find(id);
        if (existingProduct == null)
        {
            return NotFound(ApiResponse.Error<Product>("Product not found"));
        }

        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
        existingProduct.Description = product.Description;

        _context.SaveChanges();
        return Ok(ApiResponse.Success(existingProduct));
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var product = _context.Products.Find(id);
        if (product == null)
        {
            return NotFound(ApiResponse.Error<Product>("Product not found"));
        }

        _context.Products.Remove(product);
        _context.SaveChanges();
        return Ok(ApiResponse.Success(product));
    }
}
