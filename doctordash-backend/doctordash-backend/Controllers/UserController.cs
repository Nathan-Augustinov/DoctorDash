﻿using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using doctordash_backend.Services.Repositories;
using doctordash_backend.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace doctordash_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository<User> _repository;
        private readonly IService<User> _service;

        public UserController(IRepository<User> repository, IService<User> service)
        {
            _repository = repository;
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            try
            {
                var createdUser = await _service.CreateAsync(user);
                return Ok(createdUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            try
            {
                var user = await _repository.GetByIdAsync(id);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var users = await _repository.GetAllAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] User user)
        {
            if (id != user.Id)
            {
                return BadRequest("ID mismatch");
            }

            try
            {
                var updatedUser = await _service.UpdateAsync(user);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var user = await ((UserRepository)_repository).GetUserByEmailAsync(loginDto.Email);
                if (user == null)
                {
                    return Unauthorized(new { Message = "User not found." });
                }
                bool validPassword = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);
                if (!validPassword)
                {
                    return Unauthorized(new { Message = "Invalid credentials." });
                }

                //return Ok(new { Message = "Login successful", UserId = user.Id });
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers(string query, string role)
        {
            try
            {
                var results = await ((UserService)_service).FindUsers(query, role);
                if (!results.Any())
                    return NotFound(new { Message = "No matches found." });

                return Ok(results.Select(user => new
                {
                    FullName = user.Firstname + " " + user.Lastname,
                    user.Role,
                    UserId = user.Id 
                }));
            } 
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
