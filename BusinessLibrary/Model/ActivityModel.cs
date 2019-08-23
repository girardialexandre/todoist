using System;

namespace BusinessLibrary.Model
{
    public class ActivityModel
    {
        public int ActivityId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateEdition { get; set; }
        public DateTime? DateRemoval { get; set; }
        public DateTime? DateCompletion { get; set; }
    }
}
