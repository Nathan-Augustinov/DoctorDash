using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly DoctorDashContext _doctorDashContext;

        public UserRepository(DoctorDashContext doctorDashContext)
        {
            _doctorDashContext = doctorDashContext;
        }

        public async Task<User> CreateAsync(User entity)
        {
            var user = await _doctorDashContext.Set<User>().AddAsync(entity);
            await _doctorDashContext.SaveChangesAsync();
            return user.Entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var user = await GetByIdAsync(id);
            _doctorDashContext.Set<User>().Remove(user);
            await _doctorDashContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _doctorDashContext.Set<User>().ToListAsync();
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            return await _doctorDashContext.Set<User>().FindAsync(id);
        }

        public async Task<User> UpdateAsync(User entity)
        {
            var existingEntry = _doctorDashContext.Set<User>().Local.FirstOrDefault(x => x.Email == entity.Email);
            if (existingEntry != null)
            {
                _doctorDashContext.Entry(existingEntry).State = EntityState.Detached;
            }

            var user = _doctorDashContext.Set<User>().Attach(entity);
            user.State = EntityState.Modified;
            await _doctorDashContext.SaveChangesAsync();
            return user.Entity;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _doctorDashContext.User.FirstOrDefaultAsync(User => User.Email == email);
        }
    }
}
