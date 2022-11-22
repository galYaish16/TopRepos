namespace repoApi.Models{
     public class RepositoryItem
    {
        public long id { get; set; }
        public string login { get; set; }
        public string name { get; set; }
        public string avatar_url { get; set; }
        public string description { get; set; }
        public int stargazer_count { get; set; }
        public string? language { get; set; }
        public int forks { get; set; }
        public string created_at { get; set; }
        public string html_url { get; set; }
    }
}
