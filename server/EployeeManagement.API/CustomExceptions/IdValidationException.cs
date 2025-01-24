namespace EployeeManagement.API.CustomExceptions
{
    public class IdValidationException : Exception
    {
        public IdValidationException(string message) : base(message)
        {
            
        }
    }
}
