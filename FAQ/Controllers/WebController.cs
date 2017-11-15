using FAQ.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace FAQ.Controllers
{
    public class WebController : ApiController
    {
        ssDB ssDB = new ssDB();
        public HttpResponseMessage Get() {
            List<SSModel> alleSS = ssDB.hentAlle();
            var Json = new JavaScriptSerializer();
            string JsonString = Json.Serialize(alleSS);

            return new HttpResponseMessage()
            {
                Content = new StringContent(JsonString, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }
    }
}
