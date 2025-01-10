using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace doctordash_backend.Services.Repositories
{
    public class PatientRepository : IRepository<Patient>
    {
        private readonly DoctorDashContext _doctorDashContext;

        public PatientRepository(DoctorDashContext doctorDashContext)
        {
            _doctorDashContext = doctorDashContext;
        }

        public async Task<Patient> CreateAsync(Patient entity)
        {
            var patient = await _doctorDashContext.Set<Patient>().AddAsync(entity);
            await _doctorDashContext.SaveChangesAsync();
            return patient.Entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var patient = await GetByIdAsync(id);
            if (patient != null)
            {
                _doctorDashContext.Set<Patient>().Remove(patient);
                await _doctorDashContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Patient>> GetAllAsync()
        {
            return await _doctorDashContext.Set<Patient>().ToListAsync();
        }

        public async Task<Patient> GetByIdAsync(Guid id)
        {
            return await _doctorDashContext.Set<Patient>().FindAsync(id);
        }

        public async Task<Patient> UpdateAsync(Patient entity)
        {
            var patient = _doctorDashContext.Set<Patient>().Attach(entity);
            patient.State = EntityState.Modified;
            await _doctorDashContext.SaveChangesAsync();
            return patient.Entity;
        }
    }
}