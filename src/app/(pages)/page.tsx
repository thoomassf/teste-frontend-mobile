import Footer from "../../components/footer";
import Header from "../../components/header";
import RestaurantItem from "../../components/restaurant-item";

export default function HomePage() {
  return (
    <div>
      <Header />
      <img src="/banner.png" alt="Banner" className="w-full" />

      <h1 className="text-xl font-extrabold text-purple pl-4 pt-6 pb-4">abertos</h1>
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />

      <h1 className="text-xl font-extrabold text-purple pl-4 pt-8 pb-4">fechados</h1>

      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />
      <RestaurantItem title="Burguer King - Colombo" img="/bk.svg" price="R$6,00" stars={4.7} />

      <Footer />
    </div>
  )
}