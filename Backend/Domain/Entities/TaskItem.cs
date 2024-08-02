using Utilities.Enums;

namespace Domain.Entities
{
    public class TaskItem : BaseEntity<Guid>
    {
        public DateTime? TaskDate { get; set; }
        public string TaskDescription { get; set; }
        public bool IsCompleted { get; set; }
        public TaskCategory Category { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}
