type P = { size?: number; className?: string };

const S = ({ size = 20, className, children, sw = 1.9 }: P & { children: React.ReactNode; sw?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    {children}
  </svg>
);

export const BagIcon = (p: P) => (
  <S {...p}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </S>
);
export const ArrowIcon = (p: P) => (
  <S {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </S>
);
export const PlusIcon = (p: P) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
);
export const MinusIcon = (p: P) => (
  <S {...p}>
    <path d="M5 12h14" />
  </S>
);
export const CloseIcon = (p: P) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </S>
);
export const CheckIcon = (p: P) => (
  <S {...p} sw={2.4}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </S>
);
export const TrashIcon = (p: P) => (
  <S {...p}>
    <path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13" />
  </S>
);
export const PhoneIcon = (p: P) => (
  <S {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </S>
);
export const MailIcon = (p: P) => (
  <S {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </S>
);
export const PinIcon = (p: P) => (
  <S {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </S>
);
export const TruckIcon = (p: P) => (
  <S {...p}>
    <path d="M3 6h11v10H3zM14 9h4l3 3.5V16h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </S>
);
export const ReceiptIcon = (p: P) => (
  <S {...p}>
    <path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </S>
);
export const PenIcon = (p: P) => (
  <S {...p}>
    <path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10Z" />
    <path d="m14 7.5 3 3" />
  </S>
);
export const TrendIcon = (p: P) => (
  <S {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </S>
);
export const CoinIcon = (p: P) => (
  <S {...p}>
    <ellipse cx="12" cy="7" rx="7" ry="3" />
    <path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
  </S>
);
export const TargetIcon = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" />
  </S>
);
export const SparkIcon = (p: P) => (
  <S {...p}>
    <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" />
  </S>
);
export const UsersIcon = (p: P) => (
  <S {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M16 4.6a3.2 3.2 0 0 1 0 6.3M21 20c0-2.8-1.7-5-4-5.8" />
  </S>
);
export const BookIcon = (p: P) => (
  <S {...p}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
    <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />
  </S>
);
export const MenuIcon = (p: P) => (
  <S {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </S>
);
export const FacebookIcon = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21Z" />
  </svg>
);
export const InstagramIcon = (p: P) => (
  <S {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </S>
);
