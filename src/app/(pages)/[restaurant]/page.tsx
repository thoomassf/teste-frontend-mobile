import CatalogItem from "@/components/catalog-item";
import Footer from "@/components/footer";
import Header from "@/components/header";
import RestaurantInfo from "@/components/restaurant-info";

export default function RestaurantPage() {
  return (
    <div className="bg-[#EEF0F5]">
      <Header />
      <RestaurantInfo />

      <CatalogItem 
        title="Niguiris" 
        isUnique 
      />
      <CatalogItem 
        title="Ceviches"  
        description="um prato super refrescante de peixe fatiado e marinado com limão"
        isUnique
      />
      <CatalogItem 
        title="Temakis" 
        description="sushi em forma de cone com salmão e cream cheese" 
      />
      <CatalogItem title="Bebidas" />
      <CatalogItem title="Sobremesas" />

      <Footer />
    </div>
  )
}