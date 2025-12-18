namespace Restaurant.Data.Repository
{
    public class SluitingsdagRepository : GenericRepository<Sluitingsdag>, ISluitingsdagRepository
    {
        public SluitingsdagRepository(RestaurantContext context) : base(context)
        {
        }

       

        public async Task<IEnumerable<Sluitingsdag>> GetAllAsync()
            => await _context.Sluitingsdagen.ToListAsync();

    }
}
