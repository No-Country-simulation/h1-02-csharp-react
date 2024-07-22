
namespace Application.Contracts.Persistence;

public interface IGenericRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IReadOnlyList<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    void Update(T entity);
    Task DeleteAsync(T entity);
    Task SaveChangesAsync();
}
