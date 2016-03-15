using buenCamino.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace buenCamino.Controllers
{
    public class ForTestingController : Controller
    {
        CaminoDb _db = new CaminoDb();

        // GET: ForTesting
        public ActionResult Index()
        {
            var model = _db.CaminoPoint.ToList();

            return View(model);
        }

        public ActionResult Test()
        {
            var model = from p in _db.CaminoPoint
                            //orderby p.Time
                            //where p.Id == 0 //id
                        select p;

            return View(model);
        }

        public ActionResult GiveMeJson()
        {
            ViewBag.Message = "Your app description page.";
            /*
            var model = new Data()
            {
                Id = 0,
                PlaceName = "Tadeusz Nalepa",
                Time = DateTime.Now,
                Latitude = 51.152155849,
                Longitude = 17.56565865
            };
            */
            var model = from p in _db.CaminoPoint
                            //orderby p.Time
                            //where p.Id == 0 //id
                        select p;
            
            //var model = _db.CaminoPoint.ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetJson()//int id)
        {
            //var model = _db.CaminoPoint.ToList();
            var model = from p in _db.CaminoPoint
                            //orderby p.Time
                        //where p.Id == 0 //id
                        select p;

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetJson2(int id)
        {
            //var model = _db.CaminoPoint.ToList();
            var model = from p in _db.CaminoPoint
                            //orderby p.Time
                        where p.Id == id
                        select p;

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public class Data
        {
            public int Id { get; set; }
            public string PlaceName { get; set; }
            public DateTime Time { get; set; }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }
    }
}