/**
 * Business facts from berich.mn (Zochil shop 32150: shop settings, payment and delivery rules, delivery option,
 * FAQ, posts), the Facebook page «Be Rich Club - Bolortuya» and the Instagram profile, read on 2026-11-17.
 * Nothing here is invented; open questions are listed in docs/erxes/MANUAL-STEPS.md.
 */
export const business = {
  name: "Be rich",
  /** Printed under the swan on the logo. */
  tagline: "Be Rich Community",
  /** From the bundle photo. */
  motto: "Илүү ухаалаг санхүү, илүү аз жаргалтай амьдрал",
  /** From the home banner: «Хувийн санхүүгийн Berich дэвтэр · since 2020». */
  since: 2020,
  description: "Be rich: хувийн санхүүгийн дэвтэр. Орлого, зарлага, хадгаламж, хөрөнгө оруулалтаа хөтөлж, сар, жилээ дүгнэ.",
  founder: { name: "Болортуяа Баяраа", role: "Хөрөнгө оруулалтын зөвлөх" },
  phone: { display: "9955-3426", tel: "+97699553426" },
  email: "be.bolortuya@gmail.com",
  facebook: "https://www.facebook.com/berichclubbolortuya/",
  instagram: "https://www.instagram.com/be.rich.boloroo/",
  /** The club, linked at the end of the shop's post «Яагаад хөрөнгө оруулагч болох хэрэгтэй вэ?». */
  community: "https://www.skool.com/berichcommunity",
  /** Zochil has no QPay or payment methods set up yet (task 1.2); the website offers QPay and bank transfer. */
  payments: [
    { id: "qpay", name: "QPay", note: "Аль ч банкны аппаар QR уншуулж төлнө" },
    { id: "bank", name: "Дансаар", note: "Дансны мэдээллийг захиалга бүртгэгдэхэд илгээнэ" },
  ],
  /**
   * The Zochil delivery option «УБ»: 7,000₮, zone «7 буудал, Нисэх, Шар хад, Орбитын тойрог хүртэл», no delivery outside it,
   * free when the order is over 22,000₮ (`delivery_price_limit`, applied by Zochil's checkout as subtotal > limit).
   * Every product costs more than 22,000₮, so in practice delivery is free; this is listed as an open question.
   */
  delivery: [
    {
      id: "ub",
      name: "Улаанбаатар",
      fee: 7000,
      freeOver: 22000,
      note: "7 буудал, Нисэх, Шар хад, Орбитын тойрог хүртэл · төлбөр баталгаажснаас хойш 48–72 цагт",
    },
  ],
  zone: "7 буудал, Нисэх, Шар хад, Орбитын тойрог хүртэл хүргэлт хийнэ. Бүсээс гадуурх хаягаар хүргэлт хийгдэхгүй.",
  rules: {
    delivery: "Төлбөр баталгаажснаас хойш 48–72 цагийн дараа хүргэгдэнэ.",
    payment: "Төлбөр буцаагдахгүй.",
    ebarimt: "Бүх захиалгад и-баримт олгоно. Байгууллагаар авах бол 7 оронтой регистрийн дугаараа бичнэ үү.",
  },
} as const;

export type DeliveryId = (typeof business.delivery)[number]["id"];
export const deliveryOption = (id: DeliveryId) => business.delivery.find((d) => d.id === id)!;

/** Zochil's rule: free when the goods total is over the limit, else the zone fee. */
export const deliveryFee = (id: DeliveryId, subtotal: number) => {
  const d = deliveryOption(id);
  return subtotal > d.freeOver ? 0 : d.fee;
};
