using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {

            //return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                
            var userIdString = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdString))
                return 0; // or handle the case where the user ID claim is missing, e.g., throw an exception
                //throw new Exception("User ID claim is missing from the token.");

                return int.Parse(userIdString); 
            
        }        
    }
}