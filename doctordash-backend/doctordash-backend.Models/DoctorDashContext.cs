using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doctordash_backend.Models
{
    public class DoctorDashContext : DbContext
    {
        public DoctorDashContext()
        {
            
        }
        public DoctorDashContext(DbContextOptions<DoctorDashContext> options) : base(options) { }

        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Doctor> Doctor { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.UseSqlServer("Server=localhost,1433;Database=DoctorDash;User Id=sa;Password=cejsyq-muvzov-pojdA3;TrustServerCertificate=true;Encrypt=false;");
    }
}
