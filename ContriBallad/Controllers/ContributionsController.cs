using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ContriBallad.Controllers
{
    [System.Web.Http.RoutePrefix("Contributions")]
    public class ContributionsController : ApiController
    {
        [System.Web.Http.HttpGet, System.Web.Http.Route("{id}")]
        public async Task<HttpResponseMessage> Get(string id, CancellationToken token = default(CancellationToken))
        {
            try
            {
                string response = "";
                
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(string.Format("https://github.com/users/{0}/contributions", id));

                using (HttpWebResponse res = (HttpWebResponse)request.GetResponse())
                {
                    if (res.StatusCode == HttpStatusCode.OK)
                    {
                        using (Stream stream = res.GetResponseStream())
                        using (StreamReader reader = new StreamReader(stream))
                        {
                            response = reader.ReadToEnd();
                        }

                        response = response.Replace("\"", "'");


                        return Request.CreateResponse(HttpStatusCode.OK, response);
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.BadRequest);
                    }
                }

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}