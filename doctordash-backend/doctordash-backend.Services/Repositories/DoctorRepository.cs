using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Repositories
{
    public class DoctorRepository : IRepository<Doctor>
    {
        private readonly DoctorDashContext _doctorDashContext;

        public DoctorRepository(DoctorDashContext doctorDashContext)
        {
            _doctorDashContext = doctorDashContext;
        }

        public async Task<Doctor> CreateAsync(Doctor entity)
        {
            var doctor = await _doctorDashContext.Set<Doctor>().AddAsync(entity);
            await _doctorDashContext.SaveChangesAsync();
            return doctor.Entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var doctor = await GetByIdAsync(id);
            _doctorDashContext.Set<Doctor>().Remove(doctor);
            await _doctorDashContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Doctor>> GetAllAsync()
        {
            return await _doctorDashContext.Set<Doctor>().ToListAsync();
        }

        public async Task<Doctor> GetByIdAsync(Guid id)
        {
            return await _doctorDashContext.Set<Doctor>().FindAsync(id);
        }

        public async Task<Doctor> UpdateAsync(Doctor entity)
        {
            var doctor = _doctorDashContext.Set<Doctor>().Attach(entity);
            doctor.State = EntityState.Modified;
            await _doctorDashContext.SaveChangesAsync();
            return doctor.Entity;
        }

        public async Task<IEnumerable<User>> FindDoctorsBySpecialization(string specialization)
        {
            return await _doctorDashContext.User
                .Join(_doctorDashContext.Doctor,
                      user => user.Id,
                      doctor => doctor.DoctorId,
                      (user, doctor) => new { User = user, Doctor = doctor })
                .Where(ud => ud.Doctor.Specialization.ToLower().Contains(specialization.ToLower()))
                .Select(ud => ud.User)
                .ToListAsync();
        }
    }
}