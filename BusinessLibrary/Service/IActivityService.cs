using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IActivityService
    {
        Task<List<ActivityModel>> GetActivities();
        Task<bool> SaveActivity(ActivityModel activity);
        Task<bool> DeleteActivity(int activityId);
    }
}
