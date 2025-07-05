import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-8">
        <h1 className="text-2xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          EVM Pimlico
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/simple-counter">
              Simple Counter
            </Link>
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/simple-account">
              Simple Account
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}