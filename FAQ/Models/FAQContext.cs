using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace FAQ.Models
{
     public class FAQContext : DbContext
    {
        public FAQContext() : base("name=FAQ") {
            Database.SetInitializer(new DbInitializer());
            Database.Initialize(true);
        }

        public DbSet<SSModel> SSer { get; set; }
        public DbSet<ISModel> ISer { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }

    public class DbInitializer : CreateDatabaseIfNotExists<FAQContext> {

        protected override void Seed(FAQContext context)
        {
            var sporsmal = new SSModel()
            {
                id = 1,
                sporsmal = "Q1",
                svar = "A1"
                
            };

            var sporsmal1 = new SSModel()
            {
                id = 1,
                sporsmal = "Q2",
                svar = "A2"

            };

            var sporsmal2 = new SSModel()
            {
                id = 1,
                sporsmal = "Q3",
                svar = "A3"

            };
            context.SSer.Add(sporsmal);
            context.SSer.Add(sporsmal1);
            context.SSer.Add(sporsmal2);
            base.Seed(context);
        }

    }
}