import type { Metadata } from "next";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Download or preview ${siteConfig.name}'s resume.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="section-container max-w-4xl py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Resume</h1>
        <p className="text-muted-foreground max-w-xl">
          Preview below, or download a copy to keep for later.
        </p>
        <Button asChild size="lg">
          <a href={siteConfig.resumePdf} download>
            <Download className="size-4" />
            Download PDF
          </a>
        </Button>
      </div>

      <div className="glass-panel mt-12 overflow-hidden rounded-2xl">
        <object
          data={siteConfig.resumePdf}
          type="application/pdf"
          className="h-[80vh] w-full"
          aria-label={`${siteConfig.name} resume preview`}
        >
          <div className="text-muted-foreground flex h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
            <p>
              Your browser can&apos;t preview PDFs inline. Use the download button above
              instead.
            </p>
          </div>
        </object>
      </div>
    </div>
  );
}
