
public class TokenValidationMiddleware
{
    private readonly RequestDelegate _next;

    public TokenValidationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Check if the request is for the login route (customize the condition as needed)
        if (context.Request.Path.HasValue && context.Request.Path.Value.EndsWith("/authenticate"))
        {
            // If it's a login request, skip token validation and proceed to the next middleware
            await _next(context);
            return;
        }
        // Get the token from the request headers
        string token = context.Request.Headers["Authorization"];

        if (string.IsNullOrEmpty(token))
        {
            // Token is missing, return a 401 Unauthorized response
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Token is missing.");
            return;
        }

        // You can add additional token validation logic here, such as checking its validity or user permissions.

        // Call the next middleware in the pipeline
        await _next(context);
    }
}
