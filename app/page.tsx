import { InvestorForm } from "./components/investor-form"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="space-y-6 pb-16">
        <InvestorForm />
      </div>
    </main>
  )
}