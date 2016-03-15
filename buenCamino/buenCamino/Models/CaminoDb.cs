using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace buenCamino.Models
{
    public class CaminoDb : DbContext
    {
        public CaminoDb() : base("name=DefaultConnection")
        {
            //Database.SetInitializer<CaminoDb>(new CreateDatabaseIfNotExists<CaminoDb>());
        }

        public DbSet<CaminoModels> CaminoPoint { get; set; }
    }
}