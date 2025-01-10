using System;

namespace doctordash_backend.Models
{
    public class Appointment
    {
       public Guid AppointmentId { get; set; }   // Primary Key
        public Guid DoctorId { get; set; }        // Foreign Key to Doctor
        public Guid PatientId { get; set; }       // Foreign Key to Patient
        public DateTime Date { get; set; }        // Appointment Date and Time
        public string Status { get; set; }        // Appointment Status (e.g., 'Scheduled', 'Completed', 'Cancelled')
        public string Notes { get; set; } 
    }
}