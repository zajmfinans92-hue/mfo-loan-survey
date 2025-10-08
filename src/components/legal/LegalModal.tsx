import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LegalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const LegalModal = ({ open, onOpenChange, title, children }: LegalModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b bg-white">
          <DialogTitle className="text-2xl md:text-3xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)] px-6 pb-6">
          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LegalModal;