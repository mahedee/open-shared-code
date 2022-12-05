using SingnalR.API.Model;

namespace SingnalR.API.Db
{
    public class SeedGenerator
    {
        public static void SeedData(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<SignalRContext>();

                if (!context.Issues.Any())
                {
                    context.Issues.AddRange(
                        new Issue
                        {
                            Code = "T01",
                            Title = "Prepare scope statement",
                            Description = "Scope statement preparation",
                            CreatedBy = "Mahedee",
                            AssignedTo = "Tahiya"
                        },
                        new Issue
                        {
                            Code = "T02",
                            Title = "Prepare project management plan",
                            Description = "Project management plan",
                            CreatedBy = "Mahedee",
                            AssignedTo = "Humaira"
                        });
                    context.SaveChanges();
                }
            }
        }
    }
}
