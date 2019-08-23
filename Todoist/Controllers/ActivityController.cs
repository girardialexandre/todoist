using System.Threading.Tasks;
using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Todoist.Controllers
{
    [Route("api/[controller]")]
    public class ActivityController : Controller
    {
        private readonly IActivityService _activityService;
        public ActivityController(IActivityService activityService)
        {
            _activityService = activityService;
        }

        [HttpGet]
        [Route("Activities")]
        public async Task<IActionResult> Activities()
        {
            return Ok(await _activityService.GetActivities());
        }

        [HttpPost]
        [Route("SaveActivity")]
        public async Task<IActionResult> SaveActivity([FromBody] ActivityModel model)
        {
            return Ok(await _activityService.SaveActivity(model));
        }

        [HttpDelete]
        [Route("DeleteActivity/{activityId}")]
        public async Task<IActionResult> DeleteActivity(int activityId)
        {
            return Ok(await _activityService.DeleteActivity(activityId));
        }
    }
}
