using System;

namespace doctordash_backend.Models
{
    public class Timeslot
    {
        public Guid TimeslotId { get; set; }
        public Guid DoctorId { get; set; }
        public DateTimeOffset StartTime { get; set; }
        public DateTimeOffset EndTime { get; set; }

        public Boolean IsAvailable { get; set; }
    }
}