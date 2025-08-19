export type Category = { id: string; name: string; icon: string };
export type Restaurant = { id: string; name: string; rating: number; categories: string[]; eta: number; coverImg: string; logo: string; featured?: boolean };
export type Promo = { id: string; img: string; label: string };
export type Coupon = { id: string; code: string; desc: string };
export type MenuItem = { id: string; name: string; desc: string; price: number; img?: string; badge?: string; category: string; rating?: number };

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Burgers', icon: 'fast-food-outline' },
  { id: 'c2', name: 'Pizza', icon: 'pizza-outline' },
  { id: 'c3', name: 'Sushi', icon: 'fish-outline' },
  { id: 'c4', name: 'Saudável', icon: 'leaf-outline' },
  { id: 'c5', name: 'Mexicana', icon: 'restaurant-outline' },
  { id: 'c6', name: 'Açaí', icon: 'ice-cream-outline' },
  { id: 'c7', name: 'Bares', icon: 'beer-outline' },
  { id: 'c8', name: 'Supermercados', icon: 'cart-outline' },
];

export const RESTAURANTS: Restaurant[] = [
  { id: 'r1', name: 'Burger House', rating: 4.7, categories: ['c1'], eta: 25, featured: true, coverImg: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop', logo: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=300&auto=format&fit=crop' },
  { id: 'r2', name: 'La Pizzeria', rating: 4.6, categories: ['c2'], eta: 30, featured: true, coverImg: 'https://images.unsplash.com/photo-1548366086-7a88f2f46094?q=80&w=1000&auto=format&fit=crop', logo: 'https://images.unsplash.com/photo-1600628421055-4d8b184c7a02?q=80&w=300&auto=format&fit=crop' },
  { id: 'r3', name: 'Sushi Zen', rating: 4.8, categories: ['c3'], eta: 35, coverImg: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop', logo: 'https://images.unsplash.com/photo-1617191518304-35b843368049?q=80&w=300&auto=format&fit=crop' },
  { id: 'r4', name: 'Verde Vivo', rating: 4.5, categories: ['c4'], eta: 22, coverImg: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1000&auto=format&fit=crop', logo: 'https://images.unsplash.com/photo-1543352634-87392b01d9b9?q=80&w=300&auto=format&fit=crop' },
  { id: 'r5', name: 'Casa Mexicana', rating: 4.4, categories: ['c5'], eta: 28, coverImg: 'https://images.unsplash.com/photo-1604467707321-70c2d16004e3?q=80&w=1000&auto=format&fit=crop', logo: 'https://images.unsplash.com/photo-1542834369-f10ebf06d3b9?q=80&w=300&auto=format&fit=crop' },
  { id: 'r6', name: 'Açaí do Vale', rating: 4.3, categories: ['c6'], eta: 18, coverImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000&auto=format&fit=crop', logo: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=300&auto=format&fit=crop' },
  { id: 'r7', name: 'Bar do Centro', rating: 4.5, categories: ['c7'], eta: 20, coverImg: 'https://images.unsplash.com/photo-1528838067603-0a09a5a65b68?q=80&w=1000&auto=format&fit=crop', logo: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c76d9?q=80&w=300&auto=format&fit=crop' },
  { id: 'r8', name: 'Supermercado Bom Preço', rating: 4.2, categories: ['c8'], eta: 40, coverImg: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1000&auto=format&fit=crop', logo: 'https://images.unsplash.com/photo-1543164904-8de9d9c11d1f?q=80&w=300&auto=format&fit=crop' },
];

export const PROMOS: Promo[] = [
  { id: 'pr1', img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1200&auto=format&fit=crop', label: '30% OFF' },
  { id: 'pr2', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop', label: 'Frete grátis' },
  { id: 'pr3', img: 'https://images.unsplash.com/photo-1504674900247-55b1844b7fba?q=80&w=1200&auto=format&fit=crop', label: 'Combo do dia' },
];

export const COUPONS: Coupon[] = [
  { id: 'cp1', code: 'FLASH10', desc: '10% OFF hoje' },
  { id: 'cp2', code: 'FRETEGRATIS', desc: 'Entrega grátis' },
  { id: 'cp3', code: 'BURGER15', desc: '15% em burgers' },
];

// Simple menu per restaurant
export const MENU: Record<string, MenuItem[]> = {
  r1: [
    { id: 'm1', name: 'Cheeseburger', desc: 'Pão, carne, queijo, alface e tomate', price: 24.9, category: 'Lanches', rating: 4.7 },
    { id: 'm2', name: 'Double Bacon', desc: 'Dois smash + bacon crocante', price: 34.9, badge: 'Popular', category: 'Lanches', rating: 4.8 },
    { id: 'm3', name: 'Batata Grande', desc: 'Batata frita crocante', price: 14.9, category: 'Acompanhamentos', rating: 4.5 },
    { id: 'm11', name: 'Refrigerante Lata', desc: '350ml', price: 6.9, category: 'Bebidas', rating: 4.2 },
  ],
  r2: [
    { id: 'm4', name: 'Margherita', desc: 'Molho, mozzarella, manjericão', price: 39.9, category: 'Pizzas', rating: 4.6 },
    { id: 'm5', name: 'Calabresa', desc: 'Calabresa + cebola', price: 44.9, category: 'Pizzas', rating: 4.5 },
  ],
  r3: [
    { id: 'm6', name: 'Combo Sushi 16u', desc: 'Variedade de sushis e sashimis', price: 59.9, category: 'Combos', rating: 4.9 },
    { id: 'm7', name: 'Uramaki Salmão', desc: '8 unidades', price: 29.9, category: 'Sushis', rating: 4.7 },
  ],
  r4: [
    { id: 'm8', name: 'Bowl Proteico', desc: 'Grãos, frango e salada', price: 32.9, category: 'Bowls', rating: 4.4 },
  ],
  r5: [
    { id: 'm9', name: 'Burrito', desc: 'Carne, feijão, queijo e pico de gallo', price: 27.9, category: 'Mexicana', rating: 4.5 },
  ],
  r6: [
    { id: 'm10', name: 'Açaí 500ml', desc: 'Com granola e banana', price: 22.9, category: 'Açaí', rating: 4.3 },
  ],
};

// Users mock (for showcase/demo only)
export type AppUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  address: string;
  phone: string;
  status: 'active' | 'blocked' | 'pending';
};

export const USERS: AppUser[] = [
  {
    id: 'u_andre',
    name: 'André',
    email: 'andrelaurentinomg@gmail.com',
    password: 'Andre1993@',
    avatar: 'https://i.pravatar.cc/150?img=12',
    address: 'Rua das Flores, 123 - Centro, Belo Horizonte/MG',
    phone: '+55 31 99999-0000',
    status: 'active',
  },
];
