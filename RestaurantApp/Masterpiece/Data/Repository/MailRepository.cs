namespace Restaurant.Data.Repository
{
    public class MailRepository: GenericRepository<Mail>, IMailRepository
    {
        public MailRepository(RestaurantContext context) : base(context){}


    }
}
