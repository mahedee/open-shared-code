//using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SingnalR.API.Db;
using SingnalR.API.HubConfig;
using SingnalR.API.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<SignalRContext>(opt => opt.UseInMemoryDatabase("SignalRDB"));

// Add signalR
builder.Services.AddSignalR();
builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//For seeding data
SeedGenerator.SeedData(app);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Enable CORS
    app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials()); // allow credentials
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseRouting();

app.Use(async (context, next) =>
{
    var hubContext = context.RequestServices
                            .GetRequiredService<IHubContext<SignalrHub>>();
    //...

    if (next != null)
    {
        await next.Invoke();
    }
});

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    //endpoints.MapHub<SignalrHub>("/hub");
    endpoints.MapHub<SignalrHub>("/hub", options =>
    {
        options.Transports = HttpTransportType.WebSockets;
    });
});

//app.MapControllers();
//app.MapHub<SignalrHub>("/hub");
app.Run();

