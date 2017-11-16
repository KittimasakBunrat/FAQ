using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FAQ.Models
{
    public class ISModel
    {
        [Key]
        public int id { get; set; }
        public string email { get; set; }
        public string sendtsporsmal { get; set; }
    }
}