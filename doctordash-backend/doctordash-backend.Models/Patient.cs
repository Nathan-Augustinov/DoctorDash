using System;

namespace doctordash_backend.Models
{
    public class Patient
    {
        public Guid PatientId { get; set; }
        public string Address { get; set; }
        public string Medical_History { get; set; }
    }
}