import { CosmeticCard } from "./typedefs";

export const DASHBOARD_DATA: CosmeticCard[] = [
  {
    id: "1",
    title: "Moisturizing Cream",
    description: "Daily hydration for sensitive skin.",
    brand: "CeraVe",
    imageUrl: "https://picsum.photos/id/20/400/300",
    expirationDate: "2025-12-01",
    openedDate: "2024-01-10",
    status: 'parsed',
    averageRating: 4.8,
    globalReviews: [
      { id: "r1", userName: "Alice", stars: 5, text: "Absolutely essential for dry skin!", date: "2024-02-15" },
      { id: "r2", userName: "Bob", stars: 4, text: "Good, but a bit greasy if you use too much.", date: "2024-01-20" },
      { id: "r2-2", userName: "Charlie", stars: 5, text: "Best cream ever.", date: "2024-01-15" },
      { id: "r2-3", userName: "Daisy", stars: 4, text: "Bit heavy for summer.", date: "2024-01-10" }
    ],
    review: {
      stars: 4,
      text: "Love how this feels on my skin. Very hydrating!"
    }
  },
  {
    id: "2",
    title: "Sunscreen SPF 50",
    description: "High protection broad spectrum.",
    brand: "La Roche-Posay",
    imageUrl: "https://picsum.photos/id/10/400/300",
    expirationDate: "2024-08-15",
    openedDate: "2023-08-15",
    status: 'parsed',
    averageRating: 4.9,
    globalReviews: [
      { id: "r3", userName: "Clara", stars: 5, text: "The only sunscreen that doesn't break me out.", date: "2024-03-01" }
    ]
  },
  {
    id: "3",
    title: "Night Serum",
    description: "Repair and rejuvenate while you sleep.",
    brand: "Estée Lauder",
    imageUrl: "https://picsum.photos/id/30/400/300",
    expirationDate: "2026-01-20",
    openedDate: "2024-05-01",
    status: 'added_manually',
    averageRating: 4.7,
    globalReviews: [
      { id: "r4", userName: "David", stars: 5, text: "Woke up with glowing skin. Amazing.", date: "2024-05-10" },
      { id: "r5", userName: "Eve", stars: 4, text: "A bit pricey, but results are visible.", date: "2024-05-05" }
    ],
    review: {
      stars: 5,
      text: "Worth every penny. My skin looks so much better in the morning."
    }
  },
  {
    id: "4",
    title: "Cleansing Oil",
    description: "Gentle makeup removal.",
    brand: "DHC",
    imageUrl: "https://picsum.photos/id/40/400/300",
    expirationDate: "2025-05-10",
    status: 'parsed',
    averageRating: 4.6,
    globalReviews: [
      { id: "r6", userName: "Fiona", stars: 5, text: "Melts makeup instantly.", date: "2024-04-12" }
    ]
  },
];

export const ARCHIVE_DATA: CosmeticCard[] = DASHBOARD_DATA.slice(0, 2).map(item => ({
  ...item, 
  id: `archived-${item.id}`, 
  isArchived: true
}));

export const ALL_PRODUCTS = [...DASHBOARD_DATA, ...ARCHIVE_DATA];
