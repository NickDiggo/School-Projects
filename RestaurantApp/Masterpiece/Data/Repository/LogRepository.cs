namespace Restaurant.Data.Repository;

public class LogRepository : GenericRepository<Log>, ILogRepository
{
    public LogRepository(RestaurantContext context) : base(context){}
    

}