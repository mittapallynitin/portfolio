import { useRef, type ReactNode } from "react";

interface CarouselProps<T> {
  items: T[];
  keyFor: (item: T) => string;
  renderItem: (item: T, index: number) => ReactNode;
}

function Carousel<T>({ items, keyFor, renderItem }: CarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(amount: number) {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="group relative min-h-0 min-w-0 lg:flex-none">
      <div
        ref={trackRef}
        className="scrollbar-none flex h-64 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 py-4 lg:h-56"
      >
        {items.map((item, index) => (
          <div
            key={keyFor(item)}
            className="h-full min-h-0 w-56 shrink-0 snap-start"
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount(-240)}
        aria-label="Scroll left"
        className="absolute top-1/2 -left-3 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-900 opacity-0 shadow-md transition-opacity group-hover:opacity-100 lg:flex"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => scrollByAmount(240)}
        aria-label="Scroll right"
        className="absolute top-1/2 -right-3 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-900 opacity-0 shadow-md transition-opacity group-hover:opacity-100 lg:flex"
      >
        ›
      </button>
    </div>
  );
}

export { Carousel };
