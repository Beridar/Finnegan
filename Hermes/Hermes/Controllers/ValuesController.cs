using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Hermes.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private static Dictionary<int, Queue<string>> SavedValues { get; } = new Dictionary<int, Queue<string>>();

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new[] {"value1", "value2"};
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            if (SavedValues.ContainsKey(id) == false)
                SavedValues[id] = new Queue<string>();

            SavedValues[id].TryDequeue(out var result);

            return result;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, string value)
        {
            if (SavedValues.ContainsKey(id) == false)
                SavedValues[id] = new Queue<string>();

            SavedValues[id].Enqueue(value);
        }
    }
}