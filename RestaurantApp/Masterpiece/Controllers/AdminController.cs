using Microsoft.AspNetCore.Mvc;

namespace Restaurant.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            if (!User.IsInRole("Eigenaar")) return RedirectToAction("Index", "Home");

            return View();
        }
    }
}
