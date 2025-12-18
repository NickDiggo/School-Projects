namespace Restaurant.Data.Repository
{
    public interface IParameterRepository : IGenericRepository<Parameter>
    {
       
        Task<Parameter?> GetByNameAsync(string naam);

    }
}
