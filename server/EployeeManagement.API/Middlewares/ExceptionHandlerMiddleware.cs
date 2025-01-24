using Microsoft.Data.SqlClient;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace EployeeManagement.API.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly ILogger<ExceptionHandlerMiddleware> logger;
        private readonly RequestDelegate next;

        public ExceptionHandlerMiddleware(ILogger<ExceptionHandlerMiddleware> logger, RequestDelegate next)
        {
            this.logger = logger;
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await next(httpContext);
            }
            catch (ValidationException validationEx)
            {
                logger.LogWarning(validationEx, validationEx.Message);

                httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                httpContext.Response.ContentType = "application/json";

                await httpContext.Response.WriteAsJsonAsync(new
                {
                    Error = "Invalid Request",
                    httpContext.Response.StatusCode,
                    validationEx.Message
                });
            }
            catch (SqlException sqlEx)
            {
                var errorId = Guid.NewGuid();

                logger.LogError(sqlEx, $"{errorId} : {sqlEx.Message}");

                httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                httpContext.Response.ContentType = "application/json";

                await httpContext.Response.WriteAsJsonAsync(new
                {
                    errorId,
                    Error = "Database Error",
                    httpContext.Response.StatusCode,
                    Message = "We are currently experiencing issues with our database. Please try again later."
                });
            }
            catch (Exception ex)
            {
                var errorId = Guid.NewGuid();
                // Log exceptions here
                logger.LogError(ex, $"{errorId} : {ex.Message}");

                //Custom Error Response
                httpContext.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                httpContext.Response.ContentType = "application/json";

                await httpContext.Response.WriteAsJsonAsync(new
                {
                    errorId,
                    Error = "Unexpected Error",
                    httpContext.Response.StatusCode,
                    Message = "Something went wrong on our end. Please try again later."
                });
            }
        }
    }
}
