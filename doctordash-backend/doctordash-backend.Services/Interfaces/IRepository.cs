using doctordash_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> CreateAsync (T entity);
        Task<T> UpdateAsync (T entity);
        Task DeleteAsync (Guid id);

    }
}
