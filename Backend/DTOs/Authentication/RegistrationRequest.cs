﻿using System.ComponentModel.DataAnnotations;
using Utilities.Enums;

namespace DTOs.Authentication;

public class RegistrationRequest
{
    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [Required]
    public string PhoneNumber { get; set; } = string.Empty;

    public List<Guid> SpecialitiesIds { get; set; } = [];

    [Required]
    public AccountType AccountType { get; set; }

    [Required]
    public IdentificationType IdentificationType { get; set; }

    [Required]
    public string IdentificationNumber { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string EmailConfirmed { get; set; } = string.Empty;
    
    [Required]
    [MinLength(8)]
    public string Password { get; set; } = string.Empty;

    //HealthCareProvider
    public string LocalRegistrationNumber { get; set; } = string.Empty;

    public string NationalRegistrationNumber { get; set; } = string.Empty;

    //Patient
    public BloodType BloodType {  get; set; }


}