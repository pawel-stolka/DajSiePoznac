using buenCamino.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace buenCamino.Controllers
{
    public class CaminoController : Controller
    {
        CaminoDb _db = new CaminoDb();

        // GET: Camino
        public ActionResult Index()
        {
            var model = _db.CaminoPoint.ToList();

            return View(model);
        }

        public ActionResult GetJson()//int id)
        {
            //var model = _db.CaminoPoint.ToList();
            var model = from p in _db.CaminoPoint
                            //orderby p.Time
                        where p.Id == 0 //id
                        select p;

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (_db != null)
            {
                _db.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}