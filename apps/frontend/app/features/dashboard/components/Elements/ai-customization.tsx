import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

export function AICustomization() {
  const [customization, setCustomization] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSave = () => {
    // Here you would typically send the customization to your backend
    console.log("Saving customization:", customization)
    setIsDialogOpen(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
      <div className="container mx-auto">
        <label htmlFor="ai-customization" className="block text-sm font-medium text-gray-700 mb-2">
          How should we personalize your newsletter score? What do you want to see more or less?
        </label>
        <div className="flex space-x-4">
          <Textarea
            id="ai-customization"
            value={customization}
            onChange={(e) => setCustomization(e.target.value)}
            className="flex-1"
            placeholder="Enter your customization preferences..."
          />
          <div className="flex flex-col justify-between">
            <span className="text-sm text-gray-500">{customization.length}/200 tokens</span>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Save</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Customization</DialogTitle>
                  <DialogDescription>Are you sure you want to save these customization preferences?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

