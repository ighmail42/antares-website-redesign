import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";

/**
 * Chrome for the public site. The content editor at /admin sits outside this
 * group, so it gets the page shell without the site's header and footer.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div id="main">{children}</div>
      <SiteFooter />
    </>
  );
}
