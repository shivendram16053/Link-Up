"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h2>{counter}</h2>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
