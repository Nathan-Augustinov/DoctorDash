using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace doctordash_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeslotController : ControllerBase
    {
        private readonly IRepository<Timeslot> _repository;
        private readonly IService<Timeslot> _service;

        public TimeslotController(IRepository<Timeslot> repository, IService<Timeslot> service)
        {
            _repository = repository;
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Timeslot timeslot)
        {
            try
            {
                var createdTimeslot = await _service.CreateAsync(timeslot);
                return Ok(createdTimeslot);
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
                var timeslot = await _repository.GetByIdAsync(id);
                if (timeslot == null)
                {
                    return NotFound();
                }
                return Ok(timeslot);
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
                var timeslot = await _repository.GetAllAsync();
                return Ok(timeslot);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] Timeslot timeslot)
        {
            try
            {
                if (id != timeslot.TimeslotId)
                {
                    return BadRequest("ID mismatch");
                }
                var updatedTimeslot = await _service.UpdateAsync(timeslot);
                return Ok(updatedTimeslot);
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