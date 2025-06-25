import PageHeader from "@/components/page-header";
import PageFooter from "@/components/page-footer";

export default function Layout({children}) {
  return (
  <>
    <PageHeader className="my-8" />
    <main>{children}</main>
    <PageFooter className="my-8" />
  </>
  )
}
