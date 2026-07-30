type Props = {
  src: string;
  alt: string;
  className?: string;
};

const DEFAULT_AVATAR = "https://i.imgur.com/Qr71crq.jpg";

export default function Avatar({
  src,
  alt,
  className,
}: Props) {
  return (
    <img
      src={src || DEFAULT_AVATAR}
      alt={alt}
      className={className}
    />
  );
}