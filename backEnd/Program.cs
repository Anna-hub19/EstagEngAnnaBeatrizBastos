var builder = WebApplication.CreateBuilder(args);

// Adicione o serviço de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Adicione outros serviços, como controllers
builder.Services.AddControllers();

var app = builder.Build();

// Aplique o uso de CORS
app.UseCors("AllowAllOrigins");

app.UseRouting();

// Mapear endpoints de controllers
app.MapControllers();

app.Run();
