"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold text-cyan-700">Hello world</h1>
      <Button onClick={() => console.log("test")}>Click me</Button>
    </main>
  );
}
