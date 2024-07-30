using System.ComponentModel.DataAnnotations;

namespace DTOs.Note
{
    public class NoteAddDto
    {
        public string? Title { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
