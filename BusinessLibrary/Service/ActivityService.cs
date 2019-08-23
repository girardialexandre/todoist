using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using DataAccessLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BusinessLibrary.Service
{
    public class ActivityService : IActivityService
    {
        public async Task<bool> DeleteActivity(int activityId)
        {
            using (TodoistDBContext db = new TodoistDBContext())
            {
                Activity activity =
                     db.Activities.Where(x => x.ActivityId == activityId).FirstOrDefault();
                if (activity != null)
                {
                    //db.Activities.Remove(activity);
                    activity.DateRemoval = DateTime.Now;
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<List<ActivityModel>> GetActivities()
        {
            using (TodoistDBContext db = new TodoistDBContext())
            {
                return await (from a in db.Activities.AsNoTracking()
                              select new ActivityModel
                              {
                                  ActivityId = a.ActivityId,
                                  Title = a.Title,
                                  Description = a.Description,
                                  Status = a.Status,
                                  DateCompletion = a.DateCompletion,
                                  DateCreation = a.DateCreation,
                                  DateEdition = a.DateEdition,
                                  DateRemoval = a.DateRemoval
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveActivity(ActivityModel activityModel)
        {
            using (TodoistDBContext db = new TodoistDBContext())
            {
                Activity activity = db.Activities.Where
                         (x => x.ActivityId == activityModel.ActivityId).FirstOrDefault();
                if (activity == null)
                {
                    activity = new Activity()
                    {
                        ActivityId = activityModel.ActivityId,
                        Title = activityModel.Title,
                        Description = activityModel.Description,
                        Status = activityModel.Status,
                        DateCompletion = activityModel.DateCompletion,
                        DateCreation = DateTime.Now,
                        DateEdition = activityModel.DateEdition,
                        DateRemoval = activityModel.DateRemoval
                    };
                    db.Activities.Add(activity);

                }
                else
                {
                    activity.ActivityId = activityModel.ActivityId;
                    activity.Title = activityModel.Title;
                    activity.Description = activityModel.Description;
                    activity.Status = activityModel.Status;
                    activity.DateCompletion = activityModel.DateCompletion;
                    activity.DateCreation = activityModel.DateCreation;
                    activity.DateEdition = DateTime.Now;
                    activity.DateRemoval = activityModel.DateRemoval;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}
