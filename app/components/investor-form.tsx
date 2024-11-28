"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ReportDialog } from "./report-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDays } from "lucide-react"

const fieldExamples = {
    startup_name: "TechVision AI",
    founders: "Jane Smith (CEO) - Former Product Lead at Google\nJohn Doe (CTO) - MIT Computer Science PhD",
    mission_statement: "To revolutionize healthcare diagnostics through accessible AI-powered solutions.",
    industry: "Healthcare Technology",
    product_or_service_description: "AI-powered diagnostic platform that analyzes medical imaging with 99% accuracy in under 60 seconds.",
    market_opportunity: "Global medical imaging market size: $40B by 2025. Currently, 70% of hospitals lack efficient diagnostic solutions.",
    competitive_advantage: "Proprietary AI algorithm with 99% accuracy, 5 pending patents, strategic partnerships with leading hospitals.",
    current_revenue: "$500,000 ARR",
    funding_goal: "$5,000,000",
    financial_projections: "2024: $2M\n2025: $5M\n2026: $12M\nProjecting break-even by Q4 2025",
    business_model: "B2B SaaS subscription model:\n- Basic: $1,000/month\n- Premium: $2,500/month\n- Enterprise: Custom pricing",
    team: "15 full-time employees including:\n- 5 ML engineers\n- 3 healthcare specialists\n- 4 software developers",
    traction: "- 10 pilot programs with major hospitals\n- 50,000 successful diagnoses\n- Featured in TechCrunch",
    current_investors: "Seed round: $1M from Health Ventures\nAngel investors: Dr. Smith (Former CEO, MedTech)",
    challenges: "- Regulatory approval timeline\n- Scaling infrastructure\n- Healthcare system integration",
  } as const

const formSteps = [
  {
    title: "Basic Information",
    description: "Let's start with your startup's core details",
    fields: [
      { name: "startup_name", label: "Startup Name", type: "input" },
      { name: "founders", label: "Founders", type: "textarea" },
      { name: "mission_statement", label: "Mission Statement", type: "textarea" },
      { name: "industry", label: "Industry", type: "input" },
    ]
  },
  {
    title: "Product & Market",
    description: "Tell us about your product and market opportunity",
    fields: [
      { name: "product_or_service_description", label: "Product/Service Description", type: "textarea" },
      { name: "market_opportunity", label: "Market Opportunity", type: "textarea" },
      { name: "competitive_advantage", label: "Competitive Advantage", type: "textarea" },
    ]
  },
  {
    title: "Financials",
    description: "Share your financial details and goals",
    fields: [
      { name: "current_revenue", label: "Current Revenue", type: "input" },
      { name: "funding_goal", label: "Funding Goal", type: "input" },
      { name: "financial_projections", label: "Financial Projections", type: "textarea" },
      { name: "business_model", label: "Business Model", type: "textarea" },
    ]
  },
  {
    title: "Team & Traction",
    description: "Tell us about your team and progress",
    fields: [
      { name: "team", label: "Team", type: "textarea" },
      { name: "traction", label: "Traction", type: "textarea" },
      { name: "current_investors", label: "Current Investors", type: "textarea" },
      { name: "challenges", label: "Challenges", type: "textarea" },
    ]
  },
]

const initialFormData = {
  startup_name: "",
  founders: "",
  mission_statement: "",
  industry: "",
  product_or_service_description: "",
  current_revenue: "",
  funding_goal: "",
  market_opportunity: "",
  competitive_advantage: "",
  traction: "",
  team: "",
  current_investors: "",
  business_model: "",
  financial_projections: "",
  challenges: "",
  additional_details: "",
}
type StartupFormData = typeof initialFormData

const formatFormDataForAPI = (data: StartupFormData) => {
  const formattedData = {} as StartupFormData
  
  Object.keys(data).forEach((key) => {
    const value = data[key as keyof StartupFormData]
    let formattedValue = 'Not specified'
    
    if (value?.trim()) {
      formattedValue = value
    } else if (key === 'additional_details') {
      formattedValue = ''
    }
    
    formattedData[key as keyof StartupFormData] = formattedValue
  })
  
  return formattedData
}

type ValidationErrors = Record<string, string>

export function InvestorForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [report, setReport] = useState<string>("")
  const [isReportOpen, setIsReportOpen] = useState(false)

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step < formSteps.length - 1) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const formattedData = formatFormDataForAPI(formData)
      
      const response = await fetch("https://flow-api.mira.network/v1/flows/flows/prasad178/Investor Magnet?version=0.0.3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "miraauthorization": process.env.NEXT_PUBLIC_MIRA_API_KEY || "",
        },
        body: JSON.stringify(formattedData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      
      const data = await response.json()
      setReport(data.result || JSON.stringify(data, null, 2))
      setIsReportOpen(true)
    } catch (error) {
      alert('Failed to generate report. Please try again.')
      console.error("Error:", error)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Investor Magnet
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform your startup pitch into a compelling investment narrative. Complete the form below to generate a professional investor report.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>Takes about 10-15 minutes to complete</span>
        </div>
      </div>

      {/* Form Card with enhanced styling */}
      <Card className="w-full max-w-3xl mx-auto border-2 shadow-lg">
        <CardHeader className="space-y-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-t-lg">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">{formSteps[step].title}</CardTitle>
            <CardDescription className="text-base">
              {formSteps[step].description}
              <div className="mt-2 font-medium">
                Step {step + 1} of {formSteps.length}
              </div>
            </CardDescription>
          </div>
          <Progress 
            value={((step + 1) / formSteps.length) * 100} 
            className="h-2 w-full bg-gray-200 dark:bg-gray-700"
          />
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          {formSteps[step].fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {field.label}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                      Use Example
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">Example {field.label}</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {fieldExamples[field.name as keyof typeof fieldExamples]}
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleInputChange(field.name, fieldExamples[field.name as keyof typeof fieldExamples])}
                      >
                        Use This Example
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              {field.type === "textarea" ? (
                <Textarea
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  className="min-h-[100px] resize-y"
                />
              ) : (
                <Input
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  className="bg-white dark:bg-gray-950"
                />
              )}
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-b-lg">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="hover:bg-white dark:hover:bg-gray-800"
          >
            Previous
          </Button>
          {step === formSteps.length - 1 ? (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {isSubmitting ? "Generating Report..." : "Generate Report"}
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Next
            </Button>
          )}
        </CardFooter>
      </Card>

      <ReportDialog 
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        report={report}
      />
    </div>
  )
}