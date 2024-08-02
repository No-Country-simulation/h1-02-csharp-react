using Utilities.Enums;

namespace DTOs.TaskItem
{
    public class TaskItemAddDto
    {
        public DateTime? TaskDate { get; set; }
        public TaskCategory Category { get; set; }
    }
}
