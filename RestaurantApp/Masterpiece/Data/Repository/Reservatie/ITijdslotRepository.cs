namespace Restaurant.Data.Repository
{
    public interface ITijdslotRepository : IGenericRepository<Tijdslot>
    {

        Task<IEnumerable<Tijdslot>> GetAllAsync();
        Task<Tijdslot?> GetByIdAsync(int id);
        Task<IEnumerable<Tijdslot>> GetActieveTijdsloten();
    }
}
