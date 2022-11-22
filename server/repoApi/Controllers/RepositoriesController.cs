using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using repoApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Net.Http.Headers;
using repoApi.Models;

namespace repoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepositoriesController : ControllerBase
    {
        private readonly RepositoryContext _context;
         static readonly HttpClient client = new HttpClient();

    static readonly string baseUrl = "https://api.github.com/search/repositories";

    const string PERIOD_DAY = "day";
    const string PERIOD_WEEK = "week";
    const string PERIOD_MONTH = "month";

    private static string GetDatePeriod(string period)
        {
            DateTime dt;
            switch (period)
            {
                case PERIOD_DAY:
                    dt = DateTime.Today.AddDays(-1);
                    break;
                case PERIOD_WEEK:
                    dt = DateTime.Today.AddDays(-7);
                    break;
                case PERIOD_MONTH:
                    dt = DateTime.Today.AddMonths(-1);
                    break;
                default:
                    dt = DateTime.Today.AddDays(-1);
                    break;
            }
            return dt.ToString("yyyy-MM-dd");
        }

    static async Task<JsonElement> getRepo(string date)
    {
        // Call asynchronous network methods in a try/catch block to handle exceptions.
        string created = $"q=created:>{date}";
        string sort = "sort=stars";
        string order ="order=asc";
        string url =$"{baseUrl}?{created}&{sort}&{order}";
        // https://api.github.com/search/repositories?q=created:>2022-11-02&sort=stars&order=desc
        try
        {
            var userAgent = new ProductInfoHeaderValue("Mishloha", "1.0");
            client.DefaultRequestHeaders.UserAgent.Add(userAgent);
            var response = await client.GetAsync(url);

            string responseBody = await response.Content.ReadAsStringAsync();

            //string responseBody = await client.GetStringAsync("https://api.github.com/search/repositories?q=created:%3E2022-11-02&sort=stars&order=desc");
            
            JsonElement arr = JsonSerializer.Deserialize<JsonElement>(responseBody);
            
            return arr;
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine("\nException Caught!");
            Console.WriteLine("Message :{0} ", e.Message);

        }
        catch(Exception e)
        {
            Console.WriteLine("\nException Caught!");
            Console.WriteLine("Message :{0} ", e.Message);
        }
        return new JsonElement();
    }

        public RepositoriesController(RepositoryContext context)
        {
            _context = context;
        }

    [HttpGet("fetch")]
    public JsonElement GetAllRepos([FromQuery]string period )
    {
        
        Task<JsonElement> githubGetResponse;
        string date=GetDatePeriod(period);
        githubGetResponse=getRepo(date);

        return githubGetResponse.Result;
    }
        // GET: api/Repositories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RepositoryItem>>> GetRepositoryItems([FromQuery]string period)
        {
          if (_context.RepositoryItems == null)
          {
              return NotFound();
          }
            return await _context.RepositoryItems.ToListAsync();
        }

        // GET: api/Repositories/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<RepositoryItem>> GetRepositoryItem(long id)
        // {
        //   if (_context.RepositoryItems == null)
        //   {
        //       return NotFound();
        //   }
        //     var repositoryItem = await _context.RepositoryItems.FindAsync(id);

        //     if (repositoryItem == null)
        //     {
        //         return NotFound();
        //     }

        //     return repositoryItem;
        // }

        // PUT: api/Repositories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRepositoryItem(long id, RepositoryItem repositoryItem)
        {
            if (id != repositoryItem.id)
            {
                return BadRequest();
            }

            _context.Entry(repositoryItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RepositoryItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Repositories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RepositoryItem>> PostRepositoryItem(RepositoryItem repositoryItem)
        {
          if (_context.RepositoryItems == null)
          {
              return Problem("Entity set 'RepositoryContext.RepositoryItems'  is null.");
          }
            _context.RepositoryItems.Add(repositoryItem);
            await _context.SaveChangesAsync();
            return repositoryItem;
            //return CreatedAtAction("GetRepositoryItem", new { id = repositoryItem.id }, repositoryItem);
        }

        // DELETE: api/Repositories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRepositoryItem(long id)
        {
            if (_context.RepositoryItems == null)
            {
                return NotFound();
            }
            var repositoryItem = await _context.RepositoryItems.FindAsync(id);
            if (repositoryItem == null)
            {
                return NotFound();
            }

            _context.RepositoryItems.Remove(repositoryItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RepositoryItemExists(long id)
        {
            return (_context.RepositoryItems?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
