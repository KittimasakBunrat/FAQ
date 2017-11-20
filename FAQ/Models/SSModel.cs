using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FAQ.Models
{
    public class SSModel
    {
        [Key]
        public int id { get; set; }
        public string kategori { get; set; }
        public string sporsmal { get; set; }
        public string svar { get; set; }
    }
}