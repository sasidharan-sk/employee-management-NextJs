"use client";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type AlertProps = {
  content: React.ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
};

export function ErrorAlertDialog({
  content,
  isOpen,
  title,
  onClose,
}: AlertProps) {
  return (
    <div className="z-50">
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription className="text-red-500">
              {content}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-blue-500 hover:bg-blue-700 text-white">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
