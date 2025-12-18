namespace Restaurant.Data.Repository
{
    public interface IProductRepository : IGenericRepository<Product>
    {

        Task<Product?> GetByIdAsync(int id);
        Task UpdateAsync(Product product);
    }
}
