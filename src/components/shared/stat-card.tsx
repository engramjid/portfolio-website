"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import type { StatItem } from "@/types";

function AnimatedCounter({ value }: { value: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 24, stiffness: 90 });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  React.useEffect(() => {
    return springValue.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [springValue]);

  return <span ref={ref}>{display}</span>;
}

export function StatCard({ label, value, suffix }: StatItem) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="glass-panel border-none py-6 text-center">
        <CardContent>
          <p className="gradient-text text-3xl font-bold sm:text-4xl">
            <AnimatedCounter value={value} />
            {suffix}
          </p>
          <p className="text-muted-foreground mt-2 text-sm">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
