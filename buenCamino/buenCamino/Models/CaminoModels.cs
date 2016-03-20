using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace buenCamino.Models
{
    public class CaminoModels
    {
        public int Id { get; set; }
        public string PlaceName { get; set; }
        public DateTime Time { get; set; }
        public double Latitude { get; set; }
        //private double _Latitude;

        //public double Latitude
        //{
        //    get { return _Latitude; }
        //    set
        //    {
        //        var convLat = value.ToString();
        //        //convLat.Replace(".", ",");
        //        _Latitude = double.Parse(convLat);
        //    }// value; }
        //}

        public double Longitude { get; set; }
        public double Altitude { get; set; }
        public string Note { get; set; }
        public string PhotoPath { get; set; }
        public string Transport { get; set; }
    }
}