using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace buenCamino.Models
{
    public class CaminoDb : DbContext
    {
        public DbSet<CaminoModels> CaminoPoint { get; set; }
    }
}