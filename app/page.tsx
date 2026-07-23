import type { Metadata } from "next";
import { HomePage, pageMetadata } from "./site";

export const metadata: Metadata = pageMetadata();

export default function Page() {
  return <HomePage />;
}
