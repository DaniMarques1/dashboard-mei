import { Header } from "@/components/dashboard/Header";
import { TaxasContent } from "@/components/dashboard/TaxasContent";

export default function TaxasPage() {
  return (
    <>
      <Header title="Taxas e Tributos" subtitle="Gerencie suas obrigações fiscais como MEI." />
      <TaxasContent />
    </>
  );
}
