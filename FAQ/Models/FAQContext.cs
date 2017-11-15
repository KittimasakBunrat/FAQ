using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace FAQ.Models
{
    public class SS
    {
        [Key]
        public int ID { get; set; }
        public String Sporsmal { get; set; }
        public String Svar { get; set; }
    }

    public class FAQContext : DbContext
    {
        public FAQContext() : base("name=FAQ") {
            Database.SetInitializer(new DbInitializer());
            Database.CreateIfNotExists();
        }

        public DbSet<SS> SSer { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }

    public class DbInitializer : DropCreateDatabaseAlways<FAQContext> {

        protected override void Seed(FAQContext context)
        {
            var sporsmal = new SS()
            {
                ID = 1,
                Sporsmal = "Q1",
                Svar = "A1"
                
            };

            var sporsmal1 = new SS()
            {
                ID = 1,
                Sporsmal = "Q2",
                Svar = "A2"

            };
            context.SSer.Add(sporsmal);
            context.SSer.Add(sporsmal1);
            base.Seed(context);
        }

    }
}