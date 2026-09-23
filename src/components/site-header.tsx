"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

function isCurrent(href: string, pathname: string, children?: readonly { href: string }[]) {
  if (pathname === href) return true;
  if (children?.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`))) {
    return true;
  }
  if (href === "/fagmiljo") {
    return (
      pathname.startsWith("/nyheter") ||
      pathname.startsWith("/artikler") ||
      (pathname.startsWith("/fag-og-kunnskap/") && pathname !== "/fag-og-kunnskap/pastand-eller-krav") ||
      pathname === "/fag-og-kunnskap"
    );
  }
  if (href === "/hvem-er-du" && pathname === "/privat") return true;
  if (!children && href !== "/" && pathname.startsWith(`${href}/`)) return true;
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>("main .cinema-hero");
      // Change surface when the header reaches the end of the actual hero,
      // including short mobile heroes and pages opened at an anchor.
      const solid = !hero || hero.getBoundingClientRect().bottom <= header.offsetHeight;
      header.dataset.solid = String(solid);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    const main = document.querySelector("main");
    if (main) observer.observe(main);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    menuRef.current?.removeAttribute("open");
  }, [pathname]);

  function closeMenu() {
    menuRef.current?.removeAttribute("open");
  }

  return (
    <header ref={headerRef} className="site-header">
      <div className="site-header-bar">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
          <Link href="/" className="relative z-[1] flex shrink-0 items-center" onClick={closeMenu}>
            <Image
              src="/brand/flo-wordmark-red-white-dot.png"
              alt="Flo Brannsikring"
              width={280}
              height={84}
              className="site-header-logo h-7 w-auto sm:h-11"
              priority
            />
          </Link>
          <nav className="site-nav" aria-label="Hovedmeny">
            {nav.map((item) => {
              const current = isCurrent(item.href, pathname, "children" in item ? item.children : undefined);
              const children = "children" in item ? item.children : undefined;
              if (!children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn("site-nav-link", current && "is-current")}
                  >
                    {item.short}
                  </Link>
                );
              }
              return (
                <div key={item.href} className="site-nav-item">
                  <Link href={item.href} className={cn("site-nav-link", current && "is-current")}>
                    {item.short}
                    <span className="site-nav-caret" aria-hidden="true" />
                  </Link>
                  <div className="site-nav-drop" role="list">
                    {children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="listitem"
                        className={cn(
                          "site-nav-drop-link",
                          (pathname === child.href || pathname.startsWith(`${child.href}/`)) && "is-current",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <SocialLinks tone="light" className="header-social" />
            <Button asChild size="sm" className="hidden lg:inline-flex">
              <Link href="/kontakt">Send saken</Link>
            </Button>
            <details ref={menuRef} className="group lg:hidden">
              <summary className="site-menu-toggle">
                <span className="group-open:hidden">Meny</span>
                <span className="hidden group-open:inline">Lukk</span>
              </summary>
              <div className="site-menu">
                <nav id="mobile-nav" className="site-menu-body" aria-label="Mobilmeny">
                  <ol>
                    {nav.map((item, i) => {
                      const children = "children" in item ? item.children : undefined;
                      return (
                        <li key={item.href}>
                          <Link href={item.href} onClick={closeMenu}>
                            <span className="ed-kicker">{String(i + 1).padStart(2, "0")}</span>
                            <span>{item.label}</span>
                          </Link>
                          {children ? (
                            <ul className="site-menu-sub">
                              {children.map((child) => (
                                <li key={child.href}>
                                  <Link href={child.href} onClick={closeMenu}>
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      );
                    })}
                  </ol>
                  <div className="pt-8">
                    <Button asChild>
                      <Link href="/kontakt" onClick={closeMenu}>
                        Send saken
                      </Link>
                    </Button>
                  </div>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
