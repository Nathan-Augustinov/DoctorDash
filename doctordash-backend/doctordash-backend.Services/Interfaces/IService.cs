using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Interfaces
{
    public interface IService<T> where T : class
    {
        public Task<T> CreateAsync(T entity);
        public Task<T> UpdateAsync(T entity);
        public Task DeleteAsync(Guid id);
    }
}
