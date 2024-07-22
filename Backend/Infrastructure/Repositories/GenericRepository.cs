using Persistence.Data;
using Application.Contracts.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public abstract class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly JustinaDbContext _dbContext;

    public GenericRepository(JustinaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        return await _dbContext.Set<T>().FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> GetAllAsync()
    {
        return await _dbContext.Set<T>().ToListAsync();
    }

    public async Task<T> AddAsync(T entity)
    {
        await _dbContext.Set<T>().AddAsync(entity);
        return entity;
    }

    public void Update(T entity)
    {
        _dbContext.Set<T>().Update(entity);
    }

    // implement soft delete
    public async Task DeleteAsync(T entity)
    {
        //_dbContext.Set<T>().Remove(entity);
        //await _dbContext.SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}
