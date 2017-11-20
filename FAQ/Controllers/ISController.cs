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
    public class ISController : ApiController
    {
        ssDB ssDB = new ssDB();
        public HttpResponseMessage Get()
        {
            List<ISModel> alleIS = ssDB.hentAlleIS();
            var Json = new JavaScriptSerializer();
            string JsonString = Json.Serialize(alleIS);

            return new HttpResponseMessage()
            {
                Content = new StringContent(JsonString, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }

        [HttpPost]
        public HttpResponseMessage Post([FromBody]ISModel innIS)
        {

            if (ModelState.IsValid)
            {
                bool OK = ssDB.lagreIS(innIS);
                if (OK)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };

                }
            }
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.BadRequest,
                Content = new StringContent("Kunne ikke sette inn spørsmålet.")
            };
        }
    }
}
