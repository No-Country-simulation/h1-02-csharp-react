using Utilities.Enums;

namespace DTOs.TaskItem
{
    public class TaskItemUpdateDto
    {
        public Guid Id { get; set; }
        public bool IsCompleted { get; set; }
    }
}
