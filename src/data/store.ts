// Edit this number to change the store's WhatsApp contact.
// Format: country code + number, no + or spaces.
export const WHATSAPP_NUMBER = '966500000000';
export const WHATSAPP_MESSAGE = 'مرحبًا My Home، أرغب في الاستفسار عن منتجاتكم.';

export const STORE_INFO = {
  name: 'My Home',
  nameAr: 'ماي هوم',
  city: 'مكة المكرمة',
  country: 'المملكة العربية السعودية',
  address: 'حي العزيزية، شارع الحج، مكة المكرمة',
  phone: '+966 50 000 0000',
  phoneRaw: '966500000000',
  email: 'info@myhome.sa',
  hours: 'السبت - الخميس: 9 صباحًا - 11 مساءً',
  social: {
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    snapchat: 'https://snapchat.com',
    tiktok: 'https://tiktok.com',
  },
  // Google Maps embed centered on Mecca; replace coordinates with exact store location later.
  mapEmbedUrl:
    'https://www.google.com/maps?q=Mecca%20Saudi%20Arabia&output=embed',
};

export const whatsappLink = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
