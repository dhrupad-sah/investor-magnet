import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import ReactMarkdown from "react-markdown"

interface ReportDialogProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly report: string
}

const MarkdownComponents = {
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-2xl font-bold mt-6 mb-4" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold mt-6 mb-3" {...props}>{children}</h2>
  ),
  strong: (props: React.HTMLProps<HTMLElement>) => <span className="font-bold" {...props} />,
  p: (props: React.HTMLProps<HTMLParagraphElement>) => <p className="my-2" {...props} />,
  ul: (props: React.HTMLProps<HTMLUListElement>) => <ul className="list-disc pl-6 my-2" {...props} />,
  li: (props: React.HTMLProps<HTMLLIElement>) => <li className="my-1" {...props} />,
}

export function ReportDialog({ isOpen, onClose, report }: ReportDialogProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      // Remove markdown syntax when copying
      const plainText = report.replace(/\*\*/g, '')
      await navigator.clipboard.writeText(plainText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between sticky top-0 bg-background pb-4 z-10 border-b">
          <DialogTitle>Generated Report</DialogTitle>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={copyToClipboard}
            className="transition-all duration-200"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </DialogHeader>
        <div className="mt-4 prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown components={MarkdownComponents}>
            {report}
          </ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  )
}