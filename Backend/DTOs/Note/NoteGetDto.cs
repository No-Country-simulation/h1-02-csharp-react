namespace DTOs.Note
{
    public class NoteGetDto
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string Description { get; set; }
        public Guid PatientId { get; set; }
    }
}
