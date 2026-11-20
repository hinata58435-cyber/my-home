export type Category =
  | 'bedroom'
  | 'living'
  | 'sofas'
  | 'dining'
  | 'side-tables'
  | 'storage'
  | 'decor';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'bedroom', label: 'غرف النوم' },
  { id: 'living', label: 'غرف المعيشة' },
  { id: 'sofas', label: 'الكنب والمجالس' },
  { id: 'dining', label: 'طاولات الطعام' },
  { id: 'side-tables', label: 'الطاولات الجانبية' },
  { id: 'storage', label: 'الخزائن والتخزين' },
  { id: 'decor', label: 'الديكورات والإكسسوارات' },
];

export const categoryLabel = (id: Category): string =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

// High-quality, stable Unsplash furniture imagery
const img = (id: string, w = 900, h = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'سرير كينغ فاخر «نوڤا»',
    category: 'bedroom',
    price: 4200,
    oldPrice: 4900,
    description: 'سرير كينغ بإطار خشبي منجّد بقماش كتاني فاخر، يمنح غرفة نومك دفئًا وأناقة.',
    image: img('photo-1616594039964-ae9021a400a0'),
    rating: 4.8,
    reviews: 126,
    badge: 'الأكثر مبيعًا',
  },
  {
    id: 'p2',
    name: 'طقم قهوة سردي «ليان»',
    category: 'bedroom',
    price: 1850,
    description: 'طقم سردين وخزانة ملابس بتصميم عصري وألوان هادئة تناسب غرف النوم الحديثة.',
    image: img('photo-1540518614846-7eded433c457'),
    rating: 4.6,
    reviews: 84,
  },
  {
    id: 'p3',
    name: 'كرسي صالة مودرن «ريم»',
    category: 'living',
    price: 980,
    description: 'كرسي مريح بتصميم انسيابي وخامة قطنية ناعمة، مثالي لغرفة المعيشة.',
    image: img('photo-1567538096630-e0c55bd6374c'),
    rating: 4.7,
    reviews: 210,
    badge: 'جديد',
  },
  {
    id: 'p4',
    name: 'طاولة وسط رخامية «صفا»',
    category: 'living',
    price: 1350,
    description: 'طاولة وسط بسطح رخامي وقاعدة معدنية ذهبية، لمسة فخامة لصالتك.',
    image: img('photo-1499933374294-4584851497cc'),
    rating: 4.9,
    reviews: 95,
  },
  {
    id: 'p5',
    name: 'أريكة ثلاثية «واحة»',
    category: 'sofas',
    price: 3600,
    oldPrice: 4100,
    description: 'أريكة ثلاثية واسعة بقماش مقاومة ومخدات مريحة، قلب غرفة المعيشة.',
    image: img('photo-1555041469-a586c61ea9bc'),
    rating: 4.8,
    reviews: 178,
    badge: 'الأكثر مبيعًا',
  },
  {
    id: 'p6',
    name: 'مجلس عربي «ديوان»',
    category: 'sofas',
    price: 5200,
    description: 'مجلس عربي تقليدي ب لمسة عصرية، مساند جانبية وقماش مخملي راقٍ.',
    image: img('photo-1567016432779-094069958ea5'),
    rating: 4.9,
    reviews: 64,
  },
  {
    id: 'p7',
    name: 'طاولة طعام خشبية «ميزان»',
    category: 'dining',
    price: 2750,
    description: 'طاولة طعام تتسع لستة أشخاص، خشب زان صلب بلمسة طبيعية دافئة.',
    image: img('photo-1493663284031-b7e3aefcae8e'),
    rating: 4.7,
    reviews: 52,
  },
  {
    id: 'p8',
    name: 'طاولة طعام دائرية «لمّة»',
    category: 'dining',
    price: 2100,
    description: 'طاولة طعام دائرية أنيقة مثالية للجلسات العائلية الحميمية.',
    image: img('photo-1577140917170-285929fb55b7'),
    rating: 4.6,
    reviews: 38,
    badge: 'جديد',
  },
  {
    id: 'p9',
    name: 'طاولة جانبية ركنية «هدى»',
    category: 'side-tables',
    price: 420,
    description: 'طاولة جانبية صغيرة بسطح خشبي وأرجل معدنية، مثالية بجانب الأريكة.',
    image: img('photo-1583847268964-b28dc8f51f92'),
    rating: 4.5,
    reviews: 140,
  },
  {
    id: 'p10',
    name: 'طاولة كونسول ضيقة «نخبة»',
    category: 'side-tables',
    price: 680,
    description: 'كونسول أنيق للمدخل أو الردهة، يضيف لمسة جمالية عملية.',
    image: img('photo-1532372320572-cda25653a26d'),
    rating: 4.6,
    reviews: 47,
  },
  {
    id: 'p11',
    name: 'خزانة ملابس «تنظيم»',
    category: 'storage',
    price: 2300,
    description: 'خزانة ملابس واسعة بأرفف قابلة للتعديل ومرآة مدمجة.',
    image: img('photo-1605276374104-dee2a0ed3cd6'),
    rating: 4.7,
    reviews: 73,
  },
  {
    id: 'p12',
    name: 'وحدة تخزين مفتوحة «رفّ»',
    category: 'storage',
    price: 1150,
    description: 'وحدة رفوف مفتوحة متعددة الطبقات للكتب والديكورات.',
    image: img('photo-1554995207-c18c203602cb'),
    rating: 4.5,
    reviews: 61,
  },
  {
    id: 'p13',
    name: 'مزهرية سيراميك «رند»',
    category: 'decor',
    price: 240,
    description: 'مزهرية سيراميك مصنوعة يدويًا بألوان ترابية هادئة.',
    image: img('photo-1578500494198-246f612d3b3d'),
    rating: 4.8,
    reviews: 190,
    badge: 'جديد',
  },
  {
    id: 'p14',
    name: 'مرآة حائط ذهبية «انعكاس»',
    category: 'decor',
    price: 390,
    description: 'مرآة دائرية بإطار ذهبي نحيف، تضيف اتساعًا وأناقة للجدران.',
    image: img('photo-1602002418082-a4443e081dd1'),
    rating: 4.7,
    reviews: 88,
  },
  {
    id: 'p15',
    name: 'سجادة فاخرة «واحة»',
    category: 'decor',
    price: 890,
    oldPrice: 1100,
    description: 'سجادة بنقشات هادئة وخامة ناعمة تربط أركان الغرفة معًا.',
    image: img('photo-1600166898405-da9535204843'),
    rating: 4.6,
    reviews: 112,
  },
  {
    id: 'p16',
    name: 'مصباح أرضي «ضياء»',
    category: 'decor',
    price: 540,
    description: 'مصباح أرضي بتصميم معاصر وضوء دافئ يخلق أجواءً هادئة.',
    image: img('photo-1513506003901-1e6a229e2d15'),
    rating: 4.7,
    reviews: 75,
  },
];

// Showcase gallery images (for home page furniture gallery)
export const GALLERY_IMAGES: { src: string; title: string; subtitle: string }[] = [
  { src: img('photo-1567538096630-e0c55bd6374c', 1200, 800), title: 'غرف المعيشة', subtitle: 'أناقة وراحة' },
  { src: img('photo-1540518614846-7eded433c457', 1200, 800), title: 'غرف النوم', subtitle: 'دفء وهدوء' },
  { src: img('photo-1493663284031-b7e3aefcae8e', 1200, 800), title: 'طاولات الطعام', subtitle: 'لمّات لا تُنسى' },
  { src: img('photo-1567016432779-094069958ea5', 1200, 800), title: 'المجالس والكنب', subtitle: 'فخامة الضيافة' },
  { src: img('photo-1554995207-c18c203602cb', 1200, 800), title: 'تخزين وديكور', subtitle: 'لمسات عملية' },
  { src: img('photo-1578500494198-246f612d3b3d', 1200, 800), title: 'إكسسوارات منزلية', subtitle: 'تفاصيل تعبّر عنك' },
];

export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&h=1200&q=80';

export const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&h=900&q=80';

export const TESTIMONIALS: { name: string; role: string; text: string; rating: number; avatar: string }[] = [
  {
    name: 'نورة العتيبي',
    role: 'أم لثلاثة أطفال - مكة',
    text: 'أثثت بيتي بالكامل من My Home، الجودة ممتازة والأسعار معقولة. الكنب مريح جدًا والألوان كما في الصور تمامًا.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    name: 'أحمد الغامدي',
    role: 'مقبل على الزواج - مكة',
    text: 'تجربة تسوق سلسة من البداية للنهاية. التوصيل كان سريعًا والأثاث وصل بحالة ممتازة. شكرًا لكم.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    name: 'سارة الحربي',
    role: 'مصممة أزياء - جدة',
    text: 'ذوق رفيع في اختيار القطع. الديكورات الصغيرة أضافت لمسة ساحرة لبيتي. أنصح به بشدة.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80',
  },
];
