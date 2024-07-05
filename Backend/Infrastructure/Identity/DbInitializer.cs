using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence.Identity;

public static class DbInitializer
{
    public static async Task InitializeAsync(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        // Add more roles
        string[] roleNames = [
            "Admin", 
            "HealthCareProvider", 
            "Patient", 
            "Doner"
            ];
        IdentityResult roleResult;

        foreach (var roleName in roleNames)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        var adminUser = new ApplicationUser
        {
            FirstName = "h1-02-csharp",
            LastName = "react",
            UserName = "h1-02-csharp-react@proton.me",
            Email = "h1-02-csharp-react@proton.me",
            EmailConfirmed = true,
            IdentificationTypeId = 1
        };

        var user = await userManager.FindByEmailAsync(adminUser.Email);
        if (user == null)
        {
            var createAdminUser = await userManager.CreateAsync(adminUser, "Justina#10");
            if (createAdminUser.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
    }
}

