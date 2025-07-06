"use client";
import { Button } from "@/components/ui/button";
import { deploySimpleCounterContract } from "@/services/contract-deployments/simple-counter";

export default function SimpleCounter() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Simple Counter
        </h1>

        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={deploySimpleCounterContract}
        >
          Deploy Simple Counter Contract
        </Button>
      </div>
    </div>
  );
}
