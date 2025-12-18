using Microsoft.EntityFrameworkCore;

namespace StartSpelerAPI.Models
{
    public class Inschrijving
    {
        [Required]
        public int Id { get; set; }
        [Required(ErrorMessage = "De EventId is verplicht.")]
        public int EventId { get; set; }
        [Required(ErrorMessage = "De GebruikerId is verplicht.")]
        public string GebruikerId { get; set; }
        [Required(ErrorMessage = "Het inschrijvingsmoment is verplicht in te vullen")]
        public DateTime InschrijvingsMoment { get; set; } = DateTime.Now;
        public Event? Event { get; set; }
        public Gebruiker? Gebruiker { get; set; }
    }
}
