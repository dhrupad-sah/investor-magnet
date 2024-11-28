"use client"

import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { Button } from "@/components/ui/button"
  import { LightbulbIcon } from "lucide-react"
  
  interface FieldExampleProps {
    readonly example: string
    readonly onUseExample: (value: string) => void
  }
  
  export function FieldExample({ example, onUseExample }: FieldExampleProps) {
    const [open, setOpen] = useState(false)
  
    const handleUseExample = () => {
      onUseExample(example)
      setOpen(false)
    }
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <LightbulbIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Example</h4>
              <p className="text-sm text-muted-foreground">{example}</p>
            </div>
            <div className="flex justify-end">
              <Button 
                size="sm" 
                onClick={handleUseExample}
                className="text-xs"
              >
                Use this example
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }