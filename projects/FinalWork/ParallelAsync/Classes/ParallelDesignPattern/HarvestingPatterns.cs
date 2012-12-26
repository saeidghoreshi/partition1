using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParallelDesignPattern
{
    public class HarvestingPatterns
    {
        public static int WaitAllPattern(List<Task<int>> tasks)
        {
            Task.WaitAll(tasks.ToArray());
            int totalHits = 0;
            foreach (var t in tasks)
                totalHits += t.Result;

            return totalHits;
        }
        
        public static int WaitAllOneByOnePattern(List<Task<int>> tasks)
        {
            List<int> results = new List<int>() { };

            while (tasks.Count > 0)
            {
                int i = Task.WaitAny(tasks.ToArray());
                if (tasks[i].Exception == null)
                    results.Add(tasks[i].Result);
                tasks.RemoveAt(i);
            }

            return results.Sum();
        }
    }
}
