using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using doctordash_backend.Services.Repositories;
using doctordash_backend.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace doctordash_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IRepository<Patient> _repository;
        private readonly IService<Patient> _service;

        public PatientController(IRepository<Patient> repository, IService<Patient> service)
        {
            _repository = repository;
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Patient patient)
        {
            try
            {
                var createdPatient = await _service.CreateAsync(patient);
                return Ok(createdPatient);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            try
            {
                var patient = await _repository.GetByIdAsync(id);
                if (patient == null)
                {
                    return NotFound();
                }
                return Ok(patient);
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
                var patients = await _repository.GetAllAsync();
                return Ok(patients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] Patient patient)
        {
            try
            {
                if (id != patient.PatientId)
                {
                    return BadRequest("ID mismatch");
                }
                var updatedPatient = await _service.UpdateAsync(patient);
                return Ok(updatedPatient);
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
    }
}