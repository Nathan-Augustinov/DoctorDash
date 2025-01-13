using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using doctordash_backend.Services.Repositories;
using System;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Services
{
    public class AppointmentService : IService<Appointment>
    {
        private readonly IRepository<Appointment> _repository;

        public AppointmentService(IRepository<Appointment> repository)
        {
            _repository = repository;
        }

        public async Task<Appointment> CreateAsync(Appointment entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("Appointment entity must be non-null!");
            }
            return await _repository.CreateAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            var appointment = await _repository.GetByIdAsync(id);
            if (appointment == null)
            {
                throw new Exception("Appointment not found!");
            }
            await _repository.DeleteAsync(id);
        }

        public async Task<Appointment> UpdateAsync(Appointment entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("Appointment entity must be non-null!");
            }
            return await _repository.UpdateAsync(entity);
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByUserId(Guid userId)
        {
            return await ((AppointmentRepository)_repository).FindByUserId(userId);
        }
    }
}