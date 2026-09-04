import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Frontend-only imagery overrides. A single upload panel writes into this
 * store; scenes read from it and fall back to the bundled demo assets.
 * Files never leave the browser — they are held as object URLs.
 */
export type ImagerySlot = "sar" | "vessel" | "chart";

export interface ImagerySlotMeta {
  url: string;
  name: string;
  size: number;
}

interface ImageryContextValue {
  images: Partial<Record<ImagerySlot, ImagerySlotMeta>>;
  setImage: (slot: ImagerySlot, file: File) => void;
  clearImage: (slot: ImagerySlot) => void;
}

const ImageryContext = createContext<ImageryContextValue | null>(null);

export function ImageryProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Partial<Record<ImagerySlot, ImagerySlotMeta>>>({});
  const urls = useRef<string[]>([]);

  useEffect(
    () => () => {
      urls.current.forEach((u) => URL.revokeObjectURL(u));
    },
    [],
  );

  const setImage = useCallback((slot: ImagerySlot, file: File) => {
    const url = URL.createObjectURL(file);
    urls.current.push(url);
    setImages((prev) => ({ ...prev, [slot]: { url, name: file.name, size: file.size } }));
  }, []);

  const clearImage = useCallback((slot: ImagerySlot) => {
    setImages((prev) => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });
  }, []);

  const value = useMemo(() => ({ images, setImage, clearImage }), [images, setImage, clearImage]);

  return <ImageryContext.Provider value={value}>{children}</ImageryContext.Provider>;
}

export function useImagery() {
  const ctx = useContext(ImageryContext);
  if (!ctx) throw new Error("useImagery must be used inside <ImageryProvider>");
  return ctx;
}

/** Resolve a slot to an uploaded image, or the bundled fallback. */
export function useImagerySrc(slot: ImagerySlot, fallback: string) {
  const { images } = useImagery();
  return images[slot]?.url ?? fallback;
}
