using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComputerWinkel.Models
{
    public class Onderdeel
    {
        private double _prijs;

        public double Prijs
        {
            //prijs van hoofdletter naar _prijs
            get { return _prijs; }
            set { _prijs = value; }
        }

        public Onderdeel(double prijs)
        {
            Prijs = prijs;
        }
    }
}