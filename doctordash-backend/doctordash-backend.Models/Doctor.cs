using System;

namespace doctordash_backend.Models
{
    public class Doctor
    {
        public Guid DoctorId { get; set; }
        public string Specialization { get; set; }
        public string Qualifications { get; set; }
        public string Bio { get; set; }
    }
}