using doctordash_backend.Models;
using doctordash_backend.Services.Interfaces;
using doctordash_backend.Services.Repositories;
using doctordash_backend.Services.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IRepository<User>, UserRepository>();
builder.Services.AddTransient<IService<User>, UserService>();
builder.Services.AddTransient<IRepository<Doctor>, DoctorRepository>();
builder.Services.AddTransient<IService<Doctor>, DoctorService>();
builder.Services.AddDbContext<DoctorDashContext>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
