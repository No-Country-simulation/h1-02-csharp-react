# 🌟 Justina API

Esta es una API creada en ASP.NET Core Web API utilizando Clean Architecture. La API permite la gestión de registros y roles de acceso para administradores, centros médicos, profesionales de la salud y pacientes.

## 🚀 Tecnologías Utilizadas

- **ASP.NET Core Web API**
- **Identity**: Para la gestión de usuarios y roles.
- **FluentValidation**: Para las validaciones.
- **AutoMapper**: Para los mapeos con las entidades.
- **AWS S3**: Para el almacenamiento de archivos.
- **Google Cloud Speech-to-Text API**: Para la transcripción de audio a texto.
- **SignalR**: Para las notificaciones en tiempo real.

## 🏗️ Estructura del Proyecto

- **API**: Contiene los controladores y las configuraciones específicas de la API.
- **Core**: 
  - **Application**: Contiene la lógica de negocio, servicios, interfaces y DTOs.
  - **Domain**: Contiene las entidades del dominio y las interfaces.
  - **DTOs**: Contiene las entidades del dominio y las interfaces.
  - **Mappings**: Contiene los mapeos.
  - **Utilities**: Contiene los enums.
- **Infrastructure**:
  - **Persistence**: Contiene la implementación de la persistencia de datos y Identity.
  - **AWS**: Contiene la implementación de Simple Storage Service.
  - **GoogleCloudSpeech**: Contiene la implementación de Speech to Text de Google.
  - **SignalR**: Contiene la implementación de SignalR para notificaciones.

## 🔧 Configuración del Entorno de Desarrollo

### Prerrequisitos

- .NET 8.0 o superior
- Visual Studio 2022 o superior / Visual Studio Code
- SQL Server
- AWS CLI (configurado con las credenciales necesarias)
- Google Cloud SDK (configurado con las credenciales necesarias)

### Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/No-Country-simulation/h1-02-csharp-react.git
    cd justina-api
    ```

2. Configura las variables de entorno necesarias en el archivo `appsettings.json` y `appsettings.Development.json`:
    ```json
    {
      "ConnectionStrings": {
        "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=JustinaDb;Trusted_Connection=True;"
      },
      "AWS": {
        "BucketName": "tu-bucket",
        "AccessKey": "tu-access-key",
        "SecretKey": "tu-secret-key"
      },
      "GoogleCloud": {
        "ApiKey": "tu-google-cloud-api-key"
      }
    }
    ```

3. Restaura las dependencias e inicializa la base de datos:
    ```bash
    dotnet restore
    dotnet ef database update
    ```

### ▶️ Ejecutar la API

1. Ejecuta el proyecto:
    ```bash
    dotnet run
    ```

2. La API estará disponible en `https://localhost:5001` (o `http://localhost:5000`).

### 🛠️ Probar la API Localmente

Puedes utilizar herramientas como [Insomnia](https://insomnia.rest/download) o [Swagger](https://swagger.io/) para probar los endpoints de la API.

1. Abre tu navegador y navega a `https://localhost:5001/swagger` para ver la documentación de la API generada automáticamente por Swagger.

### 🗂️ Base de Datos

- [Diagrama de Base de Datos](https://app.diagrams.net/?src=about#G1x624ZoslVoXUVphmRSMrmYGQjhYMgt9b#%7B%22pageId%22%3A%22jUy9QFTzbuIwUU_IyLbC%22%7D)
- [Documentación de Base de Datos](https://dbdocs.io/olezdev/justinadb)

### 🌐 Enlace de Producción

La API está desplegada en producción y se puede acceder en el siguiente enlace: [Justina API en Producción](https://justina.somee.com/swagger/index.html)

## 🤝 Contribuir

Si deseas contribuir a este proyecto, por favor sigue los pasos a continuación:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agregar nueva funcionalidad'`).
4. Sube tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 📜 Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.

---
