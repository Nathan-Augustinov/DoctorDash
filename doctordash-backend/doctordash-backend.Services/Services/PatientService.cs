using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Services
{
    public class PatientService : IService<Patient>
    {
        private readonly IRepository<Patient> _repository;

        public PatientService(IRepository<Patient> repository)
        {
            _repository = repository;
        }

        public Task<Patient> CreateAsync(Patient entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("Patient entity must be non-nullable!");
            }
            return _repository.CreateAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            var patient = await _repository.GetByIdAsync(id);
            if (patient == null)
            {
                throw new Exception("Patient not found!");
            }
            await _repository.DeleteAsync(id);
        }

        public Task<Patient> UpdateAsync(Patient entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("Patient entity must be non-nullable!");
            }
            return _repository.UpdateAsync(entity);
        }
    }
}