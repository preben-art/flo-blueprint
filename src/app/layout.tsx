import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { MotionLayer } from "@/components/motion-layer";
import { PlanCursor } from "@/components/plan-cursor";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SitePlan } from "@/components/site-plan";
import { company } from "@/content/site";
import { canonicalOrigin, defaultDescription, isIndexableDeployment } from "@/lib/seo";
import "./globals.css";

const ibmSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(canonicalOrigin),
  title: {
    default: "Brannsikring ved avvik, ombygging og brannkrav | Flo Brannsikring",
    template: `%s | ${company.brandName}`,
  },
  description: defaultDescription,
  applicationName: company.brandName,
  authors: [{ name: company.legalName, url: canonicalOrigin }],
  creator: company.legalName,
  publisher: company.legalName,
  openGraph: {
    siteName: company.brandName,
    locale: "nb_NO",
    type: "website",
  },
  robots: isIndexableDeployment()
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nb" className={`${ibmSans.variable} ${ibmMono.variable} h-full antialiased`}>
      <body className="sheet flex min-h-full flex-col font-sans">
        <a className="skip-link" href="#innhold">
          Hopp til innhold
        </a>
        <SiteHeader />
        <SitePlan />
        <PlanCursor />
        <MotionLayer />
        <div id="smooth-wrapper" className="w-full">
          <div id="smooth-content" className="flex min-h-svh flex-col">
            <main id="innhold" className="plan-flow flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
