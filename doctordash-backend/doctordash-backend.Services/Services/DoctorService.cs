using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using doctordash_backend.Services.Repositories;
using System;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Services
{
    public class DoctorService : IService<Doctor>
    {
        private readonly IRepository<Doctor> _repository;

        public DoctorService(IRepository<Doctor> repository)
        {
            _repository = repository;
        }

        public Task<Doctor> CreateAsync(Doctor entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("Doctor entity must be non-nullable!");
            }
            return _repository.CreateAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            var doctor = await _repository.GetByIdAsync(id);
            if (doctor == null)
            {
                throw new Exception("Doctor not found!");
            }
            await _repository.DeleteAsync(id);
        }

        public Task<Doctor> UpdateAsync(Doctor entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("Doctor entity must be non-nullable!");
            }
            return _repository.UpdateAsync(entity);
        }

        public async Task<IEnumerable<User>> FindDoctorsBySpecialization(string specialization)
        {
            if (specialization == null)
            {
                throw new ArgumentNullException("Specialization must be non-nullable!");
            }
            return await ((DoctorRepository)_repository).FindDoctorsBySpecialization(specialization);
        }
    }
}