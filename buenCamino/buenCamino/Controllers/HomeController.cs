using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace buenCamino.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "All available content is on the front page...";

            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }
    }
}