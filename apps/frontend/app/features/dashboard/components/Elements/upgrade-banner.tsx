import { Button } from "~/components/ui/button"

export function UpgradeBanner() {
  return (
    <div className="fixed bottom-20 right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
      <p className="font-semibold mb-2">Unlock premium features!</p>
      <Button variant="secondary" size="sm">
        Upgrade Now
      </Button>
    </div>
  )
}

