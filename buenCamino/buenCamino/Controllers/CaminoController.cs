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
        // GET: Camino
        public ActionResult Index()
        {
            var model = new CaminoModels();
            model.Id = 0;
            model.PlaceName = "Wrocław - Dworzec Autobusowy";
            model.Time = DateTime.Now;
            model.Altitude = 78.182;
            model.Latitude = 51.1364865;
            model.Longitude = 17.03885617;
            model.Note = "Zaczynamy! :)";
            model.PhotoPath = "";


            return View(model);
        }
        /*
        <Trackpoint>
            <Time>2015-10-09T14:37:54.000Z</Time>
            <Position>
              <LatitudeDegrees>51.1364865</LatitudeDegrees>
              <LongitudeDegrees>17.03885617</LongitudeDegrees>
            </Position>
            <AltitudeMeters>78.182</AltitudeMeters>
            <DistanceMeters>0.30000001192092896</DistanceMeters>
            <HeartRateBpm>
              <Value>149</Value>
            </HeartRateBpm>
            <SensorState>Present</SensorState>
          </Trackpoint>*/
    }
}