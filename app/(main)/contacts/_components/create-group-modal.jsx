import { DialogFooter } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogDescription } from "@/components/ui/dialog";
import React from "react";

const CreateGroupModal = ({isOpen,onClose,onSuccess}) => {
 
    return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      
      <DialogFooter>Footer</DialogFooter>
      
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;