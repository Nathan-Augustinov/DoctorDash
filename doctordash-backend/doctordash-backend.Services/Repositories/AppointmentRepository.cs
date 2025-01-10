using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Repositories
{
    public class AppointmentRepository : IRepository<Appointment>
    {
        private readonly DoctorDashContext _context;

        public AppointmentRepository(DoctorDashContext context)
        {
            _context = context;
        }

        public async Task<Appointment> CreateAsync(Appointment entity)
        {
            var appointment = await _context.Set<Appointment>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return appointment.Entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var appointment = await GetByIdAsync(id);
            if (appointment != null)
            {
                _context.Set<Appointment>().Remove(appointment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Appointment>> GetAllAsync()
        {
            return await _context.Set<Appointment>().ToListAsync();
        }

        public async Task<Appointment> GetByIdAsync(Guid id)
        {
            return await _context.Set<Appointment>().FindAsync(id);
        }

        public async Task<Appointment> UpdateAsync(Appointment entity)
        {
            var appointment = _context.Set<Appointment>().Attach(entity);
            appointment.State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return appointment.Entity;
        }
    }
}