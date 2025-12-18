namespace Restaurant.Data.Repository
{
    public interface IMenuRepository : IGenericRepository<Product>
    {
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<IEnumerable<Product>> GetProductsByTypesAsync(List<CategorieType> types);
    }
}
