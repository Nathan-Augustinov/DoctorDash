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
    => optionsBuilder.UseSqlServer("Server=localhost;Database=DoctorDash;Trusted_Connection=True;Encrypt=false");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id)
                      .ValueGeneratedOnAdd()
                      .HasDefaultValueSql("newsequentialid()"); 

                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.Password).IsRequired();
                entity.Property(e => e.Firstname).IsRequired();
                entity.Property(e => e.Lastname).IsRequired();
                entity.Property(e => e.Role).IsRequired();
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            });
        }
    }
}
