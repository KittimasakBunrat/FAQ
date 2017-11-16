using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FAQ.Models;


namespace FAQ.Models
{
    public class ssDB
    {
        FAQContext db = new FAQContext();

        public List<SSModel> hentAlle() {
            return db.SSer.ToList(); 
        }

        public List<ISModel> hentAlleIS() {
            return db.ISer.ToList();
        }

        public bool lagreIS(ISModel innsendt) {
            var nyIS = new ISModel
            {
                email = innsendt.email,
                sendtsporsmal = innsendt.sendtsporsmal
            };

            try
            {
                db.ISer.Add(nyIS);
            }
            catch(Exception feil) {
                return false;
            }
            return true;
        }
    }
}