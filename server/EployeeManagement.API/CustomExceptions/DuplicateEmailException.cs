namespace EployeeManagement.API.CustomExceptions
{
    public class DuplicateEmailException : Exception
    {
        public DuplicateEmailException(string message) : base(message)
        {

        }
    }
}
