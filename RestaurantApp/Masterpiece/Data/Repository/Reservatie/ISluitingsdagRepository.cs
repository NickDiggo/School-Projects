namespace Restaurant.Data.Repository
{
    public interface ISluitingsdagRepository : IGenericRepository<Sluitingsdag>
    {
        
        Task<IEnumerable<Sluitingsdag>> GetAllAsync();
    }
}
