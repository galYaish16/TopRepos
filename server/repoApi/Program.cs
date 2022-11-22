using Microsoft.EntityFrameworkCore;
using repoApi.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
string CorsAllowAll = "CorsAllowAll";
builder.Services.AddCors( opt => {
    opt.AddPolicy(name: "CorsAllowAll", build => {
        build.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddControllers();
builder.Services.AddDbContext<RepositoryContext>(opt =>
    opt.UseInMemoryDatabase("RepositoryList"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors(CorsAllowAll);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
