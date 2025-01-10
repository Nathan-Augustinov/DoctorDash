using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using doctordash_backend.Services.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Services
{
    public class UserService : IService<User>
    {
        private readonly IRepository<User> _repository;

        public UserService(IRepository<User> repository)
        {
            _repository = repository;
        }
        public async Task<User> CreateAsync(User entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("User entity must be non-nullable!");
            }
            if (string.IsNullOrWhiteSpace(entity.Email) 
                || string.IsNullOrWhiteSpace(entity.Password)
                || string.IsNullOrWhiteSpace(entity.Firstname)
                || string.IsNullOrWhiteSpace(entity.Lastname)
                || string.IsNullOrWhiteSpace(entity.Role))
            {
                throw new ArgumentNullException("User details must be non-nullable and non-empty!");
            }
            var existingUser = await ((UserRepository)_repository).GetUserByEmailAsync(entity.Email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("Email already in use.");
            }
            
            entity.CreatedAt = DateTimeOffset.UtcNow;
            return await _repository.CreateAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            var result = await _repository.GetByIdAsync(id);
            if (result == null)
            {
                throw new Exception("User not found! Please enter a valid entry id!");
            }
            await _repository.DeleteAsync(id);
        }

        public async Task<User> UpdateAsync(User entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("User entity must be non-nullable!");
            }
            if (string.IsNullOrWhiteSpace(entity.Email)
                || string.IsNullOrWhiteSpace(entity.Password)
                || string.IsNullOrWhiteSpace(entity.Firstname)
                || string.IsNullOrWhiteSpace(entity.Lastname)
                || string.IsNullOrWhiteSpace(entity.Role))
            {
                throw new ArgumentNullException("User details must be non-nullable and non-empty!");
            }

            if (entity.CreatedAt < DateTimeOffset.Now)
            {
                throw new Exception("Created at timestamp should not be in the past!");
            }

            var result = await ((UserRepository)_repository).GetUserByEmailAsync(entity.Email);

            if (result == null)
            {
                throw new Exception("User not found! Please enter a valid email!");
            }

            result.Email = entity.Email;
            result.Password = entity.Password;
            result.Firstname = entity.Firstname;
            result.Lastname = entity.Lastname;
            result.Role = entity.Role;
            result.CreatedAt = entity.CreatedAt;

            return await _repository.UpdateAsync(entity);
        }
    }
}
