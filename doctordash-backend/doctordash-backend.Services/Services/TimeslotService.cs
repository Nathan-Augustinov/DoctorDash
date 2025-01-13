using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using doctordash_backend.Services.Repositories;
using System;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Services
{
    public class TimeslotService : IService<Timeslot>
    {
        private readonly IRepository<Timeslot> _repository;

        public TimeslotService(IRepository<Timeslot> repository)
        {
            _repository = repository;
        }

        // Create a new timeslot
        public Task<Timeslot> CreateAsync(Timeslot entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("Timeslot entity must be non-nullable!");
            }

            if (entity.StartTime >= entity.EndTime)
            {
                throw new ArgumentException("Start time must be earlier than end time!");
            }

            return _repository.CreateAsync(entity);
        }

        // Delete a timeslot by ID
        public async Task DeleteAsync(Guid id)
        {
            var timeslot = await _repository.GetByIdAsync(id);
            if (timeslot == null)
            {
                throw new Exception("Timeslot not found!");
            }
            await _repository.DeleteAsync(id);
        }

        // Update an existing timeslot
        public Task<Timeslot> UpdateAsync(Timeslot entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("Timeslot entity must be non-nullable!");
            }

            if (entity.StartTime >= entity.EndTime)
            {
                throw new ArgumentException("Start time must be earlier than end time!");
            }

            return _repository.UpdateAsync(entity);
        }

        public async Task<IEnumerable<Timeslot>> GetTimeslotsByDoctor(Guid doctorId)
        {
            if (doctorId == Guid.Empty)
            {
                throw new ArgumentNullException("Doctor ID must be non-empty!");
            }

            return await ((TimeslotRepository)_repository).GetTimeslotsByDoctor(doctorId);

        }
    }
}