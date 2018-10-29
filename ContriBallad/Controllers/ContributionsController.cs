using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ContriBallad.Controllers
{
    public class ContributionsController : Controller
    {
        // GET: Contributions
        public ActionResult Index()
        {
            return View();
        }
    }
}