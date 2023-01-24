namespace SingnalR.API.Model
{
    public class Issue
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Title { get; set;}
        public string Description { get; set;}
        public string? CreatedBy { get; set; }
        public string? AssignedTo { get; set; }
    }
}
