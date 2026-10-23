"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EnquiryModal({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children ?? <Button>Enquire Now</Button>}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enquiry</DialogTitle>
          <DialogDescription>Yaha apna popup form / content add karo.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
