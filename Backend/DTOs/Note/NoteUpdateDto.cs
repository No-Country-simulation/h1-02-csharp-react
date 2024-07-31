using System.ComponentModel.DataAnnotations;

namespace DTOs.Note
{
    public class NoteUpdateDto
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
