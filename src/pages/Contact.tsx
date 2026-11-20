import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Twitter, Music2, CheckCircle2, AlertCircle, User, AtSign, Hash, Type } from 'lucide-react';
import { STORE_INFO, whatsappLink } from '@/data/store';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (form.name.trim().length < 3) e.name = 'الرجاء إدخال الاسم الكامل (٣ أحرف على الأقل).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'الرجاء إدخال بريد إلكتروني صحيح.';
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) e.phone = 'الرجاء إدخال رقم جوال صحيح.';
    if (form.subject.trim().length < 3) e.subject = 'الرجاء إدخال موضوع الرسالة.';
    if (form.message.trim().length < 10) e.message = 'الرجاء كتابة رسالة لا تقل عن ١٠ أحرف.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate async submission, then open WhatsApp with the composed message.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      const msg = `طلب تواصل جديد:%0A%0Aالاسم: ${form.name}%0Aالبريد: ${form.email}%0Aالجوال: ${form.phone}%0Aالموضوع: ${form.subject}%0A%0A${form.message}`;
      window.open(whatsappLink(decodeURIComponent(msg)), '_blank');
      setForm(INITIAL);
      setTimeout(() => setSubmitted(false), 4000);
    }, 700);
  };

  const field = (
    key: keyof FormState,
    label: string,
    type: 'text' | 'email' | 'tel' | 'textarea',
    icon: typeof User,
    placeholder: string,
  ) => {
    const Icon = icon;
    const err = errors[key];
    return (
      <div>
        <label htmlFor={key} className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-dark">
          <Icon className="h-4 w-4 text-sage-500" />
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            id={key}
            value={form[key]}
            onChange={(e) => update(key, e.target.value)}
            placeholder={placeholder}
            rows={5}
            className={`input-field resize-none ${err ? 'border-red-300 focus:ring-red-200' : ''}`}
          />
        ) : (
          <input
            id={key}
            type={type}
            value={form[key]}
            onChange={(e) => update(key, e.target.value)}
            placeholder={placeholder}
            className={`input-field ${err ? 'border-red-300 focus:ring-red-200' : ''}`}
          />
        )}
        {err && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-b from-beige-100 to-ivory py-14">
        <div className="container-x text-center">
          <span className="eyebrow justify-center">تواصل معنا</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-dark sm:text-5xl">يسعدنا سماعك</h1>
          <p className="mx-auto mt-3 max-w-2xl text-dark/65">هل لديك سؤال أو استشارة؟ فريقنا في مكة المكرمة جاهز لمساعدتك. راسلنا عبر النموذج أو واتساب مباشرة.</p>
        </div>
      </section>

      <section className="container-x mt-10 grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} noValidate className="card p-7 sm:p-8">
            {submitted && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl bg-sage-50 px-4 py-3.5 text-sage-700 animate-fade-in">
                <CheckCircle2 className="h-5 w-5" />
                <p className="text-sm font-bold">تم إرسال رسالتك بنجاح! سنرد عليك قريبًا.</p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              {field('name', 'الاسم الكامل', 'text', User, 'اكتب اسمك')}
              {field('email', 'البريد الإلكتروني', 'email', AtSign, 'example@email.com')}
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {field('phone', 'رقم الجوال', 'tel', Hash, '05XXXXXXXX')}
              {field('subject', 'الموضوع', 'text', Type, 'موضوع الرسالة')}
            </div>
            <div className="mt-5">
              {field('message', 'نص الرسالة', 'textarea', MessageCircle, 'اكتب رسالتك هنا...')}
            </div>

            <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full">
              {submitting ? 'جارٍ الإرسال...' : (<><Send className="h-5 w-5" /> إرسال الرسالة</>)}
            </button>
            <p className="mt-3 text-center text-xs text-dark/50">بالإرسال تتم موافقتك على أن نتواصل معك عبر البريد أو الجوال.</p>
          </form>
        </div>

        {/* Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6">
            <h3 className="font-display text-lg font-bold text-dark">معلومات المتجر</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage-50 text-sage-500"><MapPin className="h-5 w-5" /></span>
                <div>
                  <p className="font-bold text-dark">العنوان</p>
                  <p className="text-dark/65">{STORE_INFO.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage-50 text-sage-500"><Phone className="h-5 w-5" /></span>
                <div>
                  <p className="font-bold text-dark">الهاتف</p>
                  <p dir="ltr" className="text-dark/65">{STORE_INFO.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage-50 text-sage-500"><Mail className="h-5 w-5" /></span>
                <div>
                  <p className="font-bold text-dark">البريد الإلكتروني</p>
                  <p dir="ltr" className="text-dark/65">{STORE_INFO.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage-50 text-sage-500"><Clock className="h-5 w-5" /></span>
                <div>
                  <p className="font-bold text-dark">ساعات العمل</p>
                  <p className="text-dark/65">{STORE_INFO.hours}</p>
                </div>
              </li>
            </ul>
          </div>

          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-3 bg-[#25D366] p-5 text-white hover:shadow-card">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/20"><MessageCircle className="h-6 w-6" fill="currentColor" stroke="none" /></span>
            <div>
              <p className="font-display font-bold">تواصل عبر واتساب</p>
              <p className="text-sm text-white/85">رد سريع خلال ساعات العمل</p>
            </div>
          </a>

          <div className="card p-6">
            <h3 className="font-display text-base font-bold text-dark">تابعنا على</h3>
            <div className="mt-4 flex gap-2.5">
              {[
                { href: STORE_INFO.social.instagram, icon: Instagram, label: 'انستغرام' },
                { href: STORE_INFO.social.twitter, icon: Twitter, label: 'تويتر' },
                { href: STORE_INFO.social.tiktok, icon: Music2, label: 'تيك توك' },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-xl bg-sage-50 text-sage-600 transition-all hover:bg-sage-400 hover:text-white hover:scale-105">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container-x mt-10">
        <div className="overflow-hidden rounded-[2rem] shadow-card">
          <iframe
            title="موقع My Home - مكة المكرمة"
            src={STORE_INFO.mapEmbedUrl}
            className="h-[380px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-3 text-center text-sm text-dark/50">الموقع على الخريطة تقريبي ويُمكن استبداله لاحقًا بعنوان المتجر الفعلي.</p>
      </section>
    </div>
  );
}
