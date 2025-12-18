using Microsoft.AspNetCore.Mvc;

namespace Restaurant.Controllers;

public class DbLogginController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}