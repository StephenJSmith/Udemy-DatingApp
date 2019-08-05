﻿using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
  [Route("api/[controller]")]
  [Authorize]
  [ApiController]
  public class ValuesController : ControllerBase
  {
    private readonly DataContext context;

    public ValuesController(DataContext context)
    {
      this.context = context;
    }

    // GET api/values
    [HttpGet]
    public async Task<IActionResult> GetValues()
    {
        var values = await context.Values.ToListAsync();

        return Ok(values);
    }

    // GET api/values/5
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var value = await context.Values.FirstOrDefaultAsync(x => x.Id == id);

      return Ok(value);
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}