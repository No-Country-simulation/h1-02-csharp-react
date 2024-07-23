namespace Domain.SoftDelete
{
    public interface ISoftDeletable
    {
        bool IsDeleted { get; set; }
        DateTime? DeletedOnUtc { get; set; }
    }
}
