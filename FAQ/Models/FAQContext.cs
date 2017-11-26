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
                kategoriid = 1,
                kategori = "Selvbetjening",
                sporsmal = "AVBESTILLE",
                svar = "Hvis du bestiller på sas.no eller gjennom SAS Sales and Service, får du en 24-timers pengene tilbake-garanti. Det betyr at du kan kansellere reisen uten kostnader innen 24 timer etter bestillingen og få full refusjon. Hvis du bestiller mindre enn 24 timer før avgang, kan du kansellere reisen din opptil 12 timer før avgang og få full refusjon. Dette gjør du via Mine bestillinger på vår hjemmeside. Hvis det er mer enn 24 timer siden du bestilte kan du benytte vårt skjema for avbestille."

            };

            var sporsmal1 = new SSModel()
            {
                id = 2,
                kategoriid = 1,
                kategori = "Selvbetjening",
                sporsmal = "RESERVERE SETE",
                svar = "Her kan du allerede nå kjøpe ditt favorittsete. Hent frem bestillingen ved å legge inn referansen og etternavn Det er gratis å reservere sete etter at sjekk inn er åpnet (normalt 22 timer før avgang)."

            };

            var sporsmal2 = new SSModel()
            {
                id = 3,
                kategoriid = 1,
                kategori = "Selvbetjening",
                sporsmal = "BESTILLE MAT",
                svar = "Du kan forhåndsbestille måltider her. Hent frem bestillingen ved å legge inn referansen og etternavn."

            };

            var sporsmal3 = new SSModel()
            {
                id = 4,
                kategoriid = 2,
                kategori = "Bagasje",
                sporsmal = "ER BAGASJE INKLUDERT I GO LIGHT?",
                svar = "Go Light inkluderer ikke innsjekket bagasje. Men hvis du er EuroBonus Gull- elle Diamant-medlem kan du alltid sjekke inn to bagasjer på maks 23 kg uten kostnad. Hvis du er EuroBonus Sølv medlem eller Star Alliance Gold medlem kan du sjekke inn en bagasje uten kostnad."

            };

            var sporsmal4 = new SSModel()
            {
                id = 5,
                kategoriid = 2,
                kategori = "Bagasje",
                sporsmal = "KAN JEG TA MED HÅNDBAGASJE I GO LIGHT?",
                svar = "Du kan ha med én håndbagasje (maks 8 kg, høyde 55 cm, bredde 40 cm og dybde 23 cm) og én håndveske eller PC-veske (høyde 40 cm, bredde 30 cm og dybde 15 cm) om bord."

            };

            var sporsmal5 = new SSModel()
            {
                id = 6,
                kategoriid = 3,
                kategori = "Bestilling",
                sporsmal = "KAN JEG ANNULLERE EN AVBESTILLING?",
                svar = "Nei, da må du gjøre en ny bestilling."

            };

            var sporsmal6 = new SSModel()
            {
                id = 7,
                kategoriid = 3,
                kategori = "Bestilling",
                sporsmal = "ER DET GEBYR FOR ENDRING AV BILLETT FOR SPEDBARN?",
                svar = "Nej, det er ikke gebyr for endring av billett for spedbarn."

            };

            var sporsmal7 = new SSModel()
            {
                id = 7,
                kategoriid = 4,
                kategori = "Sjekk inn",
                sporsmal = "HVORDAN SJEKKER JEG INN SPESIALBAGASJE?",
                svar = "Du sjekker inn som vanlig, får bagasjelappene og leverer spesialbagasjen ved skranken merket Spesialbagasje."

            };

            var sporsmal8 = new SSModel()
            {
                id = 8,
                kategoriid = 4,
                kategori = "Sjekk inn",
                sporsmal = "KAN JEG LEGGE TIL BAGASJE ETTER INNSJEKK?",
                svar = "Hvis du må sjekke inn mer bagasje enn det som er tillatt for billetten din, kan du kjøpe overvekt mot et gebyr. Tyngre bagasje kan sendes som flyfrakt."

            };
            context.SSer.Add(sporsmal);
            context.SSer.Add(sporsmal1);
            context.SSer.Add(sporsmal2);
            context.SSer.Add(sporsmal3);
            context.SSer.Add(sporsmal4);
            context.SSer.Add(sporsmal5);
            context.SSer.Add(sporsmal6);
            context.SSer.Add(sporsmal7);
            context.SSer.Add(sporsmal8);
            base.Seed(context);
        }

    }
}