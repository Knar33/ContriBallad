using System;
using System.Collections.Generic;
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

                HttpClient client = new HttpClient();
                var res = await client.GetAsync("https://github.com/users/{0}/contributions" + id);
                response = await res.Content.ReadAsStringAsync().ConfigureAwait(false);

                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}