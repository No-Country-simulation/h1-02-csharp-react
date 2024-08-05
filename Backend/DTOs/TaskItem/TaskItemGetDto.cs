using Utilities.Enums;

namespace DTOs.TaskItem
{
    public class TaskItemGetDto
    {
        public Guid Id { get; set; }
        public DateTime? TaskDate { get; set; }
        public string TaskDescription { get; set; }
        public bool IsCompleted { get; set; }
        public TaskCategory Category { get; set; }
    }
}
