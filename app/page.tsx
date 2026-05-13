import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { CompanySection } from "@/components/sections/company-section"
import { ArchitectureSection } from "@/components/sections/architecture-section"
import { DashboardSection } from "@/components/sections/dashboard-section"
import { SimulationSection } from "@/components/sections/simulation-section"
import { AtexSection } from "@/components/sections/atex-section"
import { ResultsSection } from "@/components/sections/results-section"
import { FutureSection } from "@/components/sections/future-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <CompanySection />
      <ArchitectureSection />
      <DashboardSection />
      <SimulationSection />
      <AtexSection />
      <ResultsSection />
      <FutureSection />
      <Footer />
    </main>
  )
}
