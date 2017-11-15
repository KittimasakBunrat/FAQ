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
            List<SSModel> listAlle = db.SSer.Select(s => new SSModel()
            {
                id = s.ID,
                sporsmal = s.Sporsmal,
                svar = s.Svar              
                 }).ToList();
            return listAlle;
        }
    }
}