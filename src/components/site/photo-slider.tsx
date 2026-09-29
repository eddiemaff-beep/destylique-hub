import { useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PhotoSlider({
  images,
  alt,
  frameClass,
  tone = "estate",
  marks = "bottom",
}: {
  images: readonly string[];
  alt: string;
  frameClass: string;
  tone?: "estate" | "fashion";
  marks?: "top" | "bottom";
}) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const count = images.length;
  const current = images[index] ?? images[0];

  function step(direction: number, event?: MouseEvent) {
    event?.preventDefault();
    event?.stopPropagation();
    setIndex((value) => (value + direction + count) % count);
  }

  function onTouchStart(event: TouchEvent) {
    startX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent) {
    if (startX.current == null) return;
    const end = event.changedTouches[0]?.clientX ?? startX.current;
    const delta = end - startX.current;
    if (Math.abs(delta) > 40) step(delta < 0 ? 1 : -1);
    startX.current = null;
  }

  const arrow =
    tone === "fashion"
      ? "border-gold bg-ink/75 text-gold"
      : "border-estate-accent bg-estate-bg/80 text-estate-accent";
  const mark = tone === "fashion" ? "bg-gold" : "bg-estate-accent";

  return (
    <div className="relative overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <img src={current} alt={`${alt}, photo ${index + 1} of ${count}`} className={frameClass} />
      <button
        type="button"
        className={cn("press absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center border", arrow)}
        aria-label="Previous photo"
        onClick={(event) => step(-1, event)}
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>
      <button
        type="button"
        className={cn("press absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center border", arrow)}
        aria-label="Next photo"
        onClick={(event) => step(1, event)}
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 flex justify-center gap-1",
          marks === "top" ? "top-2" : "bottom-2",
        )}
      >
        {images.map((_, dot) => (
          <span key={dot} className={cn("h-1 w-4", dot === index ? mark : "bg-ivory/45")} />
        ))}
      </div>
    </div>
  );
}
