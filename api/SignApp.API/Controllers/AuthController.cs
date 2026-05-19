using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SignApp.API.Data;
using SignApp.API.DTOs;
using SignApp.API.Models;

namespace SignApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;

    public AuthController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        bool emailExists = await _db.Users.AnyAsync(u => u.Email == dto.Email.ToLower());
        if (emailExists)
            return Conflict(new { message = "Bu email artıq qeydiyyatdan keçib." });

        bool usernameExists = await _db.Users.AnyAsync(u => u.Username == dto.Username.ToLower());
        if (usernameExists)
            return Conflict(new { message = "Bu username artıq istifadə olunur." });

        var user = new User
        {
            Username = dto.Username.ToLower(),
            Email = dto.Email.ToLower(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Qeydiyyat uğurlu oldu.", username = user.Username });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        string identifier = dto.Identifier.ToLower();

        var user = await _db.Users.FirstOrDefaultAsync(u =>
            u.Email == identifier || u.Username == identifier);

        if (user == null)
            return Unauthorized(new { message = "İstifadəçi tapılmadı." });

        bool passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
        if (!passwordValid)
            return Unauthorized(new { message = "Şifrə yanlışdır." });

        return Ok(new { message = "Giriş uğurlu oldu.", username = user.Username });
    }
}