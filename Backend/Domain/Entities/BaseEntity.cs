namespace Domain.Entities
{
    public abstract class BaseEntity<TId>
    {
        public TId Id { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
