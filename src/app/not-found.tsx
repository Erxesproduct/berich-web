import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap grid place-items-center py-24 text-center">
      <p className="display text-[7rem] leading-none text-gold md:text-[10rem]">404</p>
      <p className="hand -mt-2 rotate-[-3deg] text-[30px] text-pink">энэ хуудас дэвтэрт алга ✎</p>
      <p className="mt-4 max-w-md text-ink-2">Хаяг өөрчлөгдсөн байж магадгүй. Нүүр хуудаснаас эхлээрэй.</p>
      <Link href="/" className="btn btn-ink mt-8">
        Нүүр хуудас
      </Link>
    </div>
  );
}
