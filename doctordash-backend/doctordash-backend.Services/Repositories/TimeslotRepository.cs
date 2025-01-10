using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Repositories
{
    public class TimeslotRepository : IRepository<Timeslot>
    {
        private readonly DoctorDashContext _doctorDashContext;

        public TimeslotRepository(DoctorDashContext doctorDashContext)
        {
            _doctorDashContext = doctorDashContext;
        }

        // Create a new timeslot
        public async Task<Timeslot> CreateAsync(Timeslot entity)
        {
            var timeslot = await _doctorDashContext.Set<Timeslot>().AddAsync(entity);
            await _doctorDashContext.SaveChangesAsync();
            return timeslot.Entity;
        }

        // Delete a timeslot by ID
        public async Task DeleteAsync(Guid id)
        {
            var timeslot = await GetByIdAsync(id);
            _doctorDashContext.Set<Timeslot>().Remove(timeslot);
            await _doctorDashContext.SaveChangesAsync();
        }

        // Retrieve all timeslots
        public async Task<IEnumerable<Timeslot>> GetAllAsync()
        {
            return await _doctorDashContext.Set<Timeslot>().ToListAsync();
        }

        // Retrieve a timeslot by ID
        public async Task<Timeslot> GetByIdAsync(Guid id)
        {
            return await _doctorDashContext.Set<Timeslot>().FindAsync(id);
        }

        // Update an existing timeslot
        public async Task<Timeslot> UpdateAsync(Timeslot entity)
        {
            var timeslot = _doctorDashContext.Set<Timeslot>().Attach(entity);
            timeslot.State = EntityState.Modified;
            await _doctorDashContext.SaveChangesAsync();
            return timeslot.Entity;
        }
    }
}