public class ApiResponse<T>
{

    public bool Success { get; set; }
    public T? Data { get; set; }
    public string? ErrorMessage { get; set; }
}

public static class ApiResponse
{
    public static ApiResponse<T> Success<T>(T data)
    {
        return new ApiResponse<T> { Success = true, Data = data };
    }

    public static ApiResponse<T> Error<T>(string errorMessage)
    {
        return new ApiResponse<T> { Success = false, ErrorMessage = errorMessage };
    }
}
