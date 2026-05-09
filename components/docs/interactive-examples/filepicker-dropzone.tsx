"use client";

import { useState } from "react";
import { FilepickerDropzone } from "@/registry/radix-nova/filepicker-dropzone";

export function FilepickerDropzoneInteractiveExample() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="space-y-2">
      <FilepickerDropzone
        id="docs-filepicker-dropzone"
        label="Upload files"
        description="PDF, PNG, and JPG up to 1MB each."
        accept={{
          "application/pdf": [".pdf"],
          "image/png": [".png"],
          "image/jpeg": [".jpg", ".jpeg"],
        }}
        multiple
        maxSize={1 * 1024 * 1024}
        onChange={(selectedFiles) => {
          setFiles(selectedFiles.map((file) => file.name));
        }}
      />
      <p className="text-xs text-muted-foreground">
        {files.length > 0
          ? `${files.length} file(s): ${files.join(", ")}`
          : "No files selected yet."}
      </p>
    </div>
  );
}
