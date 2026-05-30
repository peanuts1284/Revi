import AnimateIn from "@/components/AnimateIn";

export default function Divider() {
  return (
    <AnimateIn>
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center">
          <div className="h-px flex-1 bg-forest" />
          <span className="select-none px-5 text-[9px] text-gold">◆</span>
          <div className="h-px flex-1 bg-forest" />
        </div>
      </div>
    </AnimateIn>
  );
}
