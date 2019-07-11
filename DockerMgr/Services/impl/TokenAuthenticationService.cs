using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DockerMgr.DTO;
using DockerMgr.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DockerMgr.Services.impl
{
    public class TokenAuthenticationService : IAuthenticateService
    {
        private readonly IUserManagementService _userManagementService;
        private readonly TokenManagement _tokenManagement;
        
        public TokenAuthenticationService(IUserManagementService service, IOptions<TokenManagement> tokenManagement)
        {
            _userManagementService = service;
            _tokenManagement = tokenManagement.Value;
        }
        public bool IsAuthenticated(TokenRequestDTO requestDto, out string token, out User theUser)
        {
            
            token = string.Empty;
            theUser = null;

            User checkedUser = null;
            if (!_userManagementService.IsValidUser(requestDto.Email, requestDto.Password, out checkedUser)) return false;

            theUser = checkedUser;
            var claim = new[]
            {
                new Claim(ClaimTypes.Email, requestDto.Email)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Any String used to sign and verify JWT Tokens, Replace this string with your own Secret"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                
            var jwtToken = new JwtSecurityToken(
                _tokenManagement.Issuer,
                _tokenManagement.Audience,
                claim,
                expires:DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
                signingCredentials: credentials
            );
            token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return true;

        }

        public string GenerateToken(string email)
        {
            string token;
            var claim = new[]
            {
                new Claim(ClaimTypes.Email, email)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenManagement.Secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                
            var jwtToken = new JwtSecurityToken(
                _tokenManagement.Issuer,
                _tokenManagement.Audience,
                claim,
                expires:DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
                signingCredentials: credentials
            );
            token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return token;
        }
    }
}