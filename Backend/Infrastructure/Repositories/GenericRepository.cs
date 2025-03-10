﻿using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;
using System.Linq.Expressions;


namespace Persistence.Repositories;

public abstract class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly JustinaDbContext _dbContext;
    private readonly IMapper _mapper;

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

    public async Task<IReadOnlyList<T>> GetAllPredicateAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbContext.Set<T>().Where(predicate).ToListAsync();
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

    public bool DeleteAsync(T entity)
    {
        if (entity == null)
        {
            return false;
        }
        _dbContext.Set<T>().Remove(entity);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);

        if (entity == null)
        {
            return false;
        }
        _dbContext.Set<T>().Remove(entity);

        return true;
    }

    public async Task<T?> GetByConditionAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbContext.Set<T>().FirstOrDefaultAsync(predicate);
    }

    public async Task AddRangeAsync(IEnumerable<T> entities)
    {
        await _dbContext.Set<T>().AddRangeAsync(entities);
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }

    public async Task InsertRange(IEnumerable<T> entities)
    {
        await _dbContext.Set<T>().AddRangeAsync(entities);
    }

    //test projectToGeneric
    //public async Task<List<TResult>> GetAllProjectedAsync<TResult>()
    //{
    //    return await _dbContext.Set<T>()
    //        .ProjectTo<TResult>(_mapper.ConfigurationProvider)
    //        .ToListAsync();
    //}

    //public async Task<List<TResult>> GetAllProjectedAsync<TResult>(Expression<Func<T, bool>> predicate)
    //{
    //    return await _dbContext.Set<T>()
    //        .Where(predicate)
    //        .ProjectTo<TResult>(_mapper.ConfigurationProvider)
    //        .ToListAsync();
    //}
}
