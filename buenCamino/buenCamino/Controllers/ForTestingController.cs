using buenCamino.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
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
            //var model = _db.CaminoPoint.ToList();
            var model = from p in _db.CaminoPoint
                            //orderby p.Time ascending
                            //where p.Id == 0 //id
                        select p;

            return View(model);
        }

        public ActionResult GiveMeJson()//int id)
        {
            //var model = _db.CaminoPoint.ToList();
            var model = from p in _db.CaminoPoint
                            //orderby p.Time
                            //where p.Id == 0 //id
                        select p;

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        // GET: Example/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Example/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CaminoModels caminoModel)//[Bind(Include = "PlaceName,Latitude,Longitude")] CaminoModels caminoModel)
        {
            if (ModelState.IsValid)
            {
                caminoModel.Time = DateTime.Now;

                _db.CaminoPoint.Add(caminoModel);
                _db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(caminoModel);
        }

        // GET: Example/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CaminoModels caminoModel = _db.CaminoPoint.Find(id);
            if (caminoModel == null)
            {
                return HttpNotFound();
            }
            return View(caminoModel);
        }

        // POST: Example/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(CaminoModels caminoModel)//[Bind(Include = "Id,Name,Height")] ExampleModels exampleModels)
        {
            //if (ModelState.IsValid)
            //{
            caminoModel.Time = DateTime.Now;
            _db.Entry(caminoModel).State = EntityState.Modified;
            _db.SaveChanges();
            return RedirectToAction("Index");
            //}
            //return View(caminoModel);
        }

        // GET: Example/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CaminoModels caminoModel = _db.CaminoPoint.Find(id);
            if (caminoModel == null)
            {
                return HttpNotFound();
            }
            return View(caminoModel);
        }

        // POST: Example/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CaminoModels caminoModel = _db.CaminoPoint.Find(id);
            _db.CaminoPoint.Remove(caminoModel);
            _db.SaveChanges();
            return RedirectToAction("Index");
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