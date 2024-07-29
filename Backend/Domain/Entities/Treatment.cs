﻿namespace Domain.Entities
{
    public class Treatment : BaseEntity<Guid>
    {
        public DateTime CreatedDate { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public ICollection<Prescription> Prescriptions { get; set; }
    }
}