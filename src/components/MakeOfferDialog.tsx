import { useState } from "react";
import { z } from "zod";
import { Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const offerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  amount: z
    .number({ invalid_type_error: "Enter a number" })
    .positive("Offer must be greater than 0")
    .max(1_000_000),
  message: z.string().trim().max(1000).optional(),
});

interface Props {
  productTitle: string;
  productHandle: string;
  listPrice: string;
  currencyCode: string;
}

// Where offers should be sent. Update to the shop owner's email.
const OFFER_RECIPIENT = "rockwellf@gmail.com";

export function MakeOfferDialog({ productTitle, productHandle, listPrice, currencyCode }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      amount: Number(fd.get("amount")),
      message: String(fd.get("message") || ""),
    };

    const parsed = offerSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        next[String(issue.path[0])] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const subject = `Offer on ${productTitle}`;
    const body = [
      `Item: ${productTitle}`,
      `Listing: ${productHandle}`,
      `List price: ${currencyCode} ${listPrice}`,
      ``,
      `Offer: ${currencyCode} ${parsed.data.amount.toFixed(2)}`,
      `From: ${parsed.data.name} <${parsed.data.email}>`,
      ``,
      `Message:`,
      parsed.data.message || "(none)",
    ].join("\n");

    const mailto = `mailto:${OFFER_RECIPIENT}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      toast.success("Offer ready to send!", {
        position: "top-center",
        description: "Your email app should have opened with the details.",
      });
    }, 400);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="mt-3 w-full md:w-auto md:ml-3 border-2 border-foreground bg-mustard hover:bg-mustard/90 text-foreground font-display shadow-[4px_4px_0_0_oklch(0.22_0.04_30)]"
        >
          <Tag className="w-4 h-4 mr-2" />
          MAKE AN OFFER
        </Button>
      </DialogTrigger>
      <DialogContent className="border-2 border-foreground">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-teal-deep">
            Make an Offer
          </DialogTitle>
          <DialogDescription>
            Sending an offer on <span className="font-semibold">{productTitle}</span>{" "}
            (listed at {currencyCode} {listPrice}).
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="offer-name">Your name</Label>
            <Input id="offer-name" name="name" maxLength={100} required />
            {errors.name && <p className="text-xs text-cherry">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="offer-email">Email</Label>
            <Input id="offer-email" name="email" type="email" maxLength={255} required />
            {errors.email && <p className="text-xs text-cherry">{errors.email}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="offer-amount">Your offer ({currencyCode})</Label>
            <Input
              id="offer-amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              required
            />
            {errors.amount && <p className="text-xs text-cherry">{errors.amount}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="offer-message">Message (optional)</Label>
            <Textarea id="offer-message" name="message" maxLength={1000} rows={3} />
            {errors.message && <p className="text-xs text-cherry">{errors.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-cherry hover:bg-cherry/90 text-cream border-2 border-foreground font-display"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "SEND OFFER"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
