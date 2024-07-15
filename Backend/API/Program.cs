using API;

var builder = WebApplication.CreateBuilder(args);

var app = builder
    .ConfigureServices()
    .ConfigurePipeline();

// Inicializar roles y usuarios
//await app.InitializeDatabase();

app.MapGet("/", () => "Justina IO");

app.Run();
