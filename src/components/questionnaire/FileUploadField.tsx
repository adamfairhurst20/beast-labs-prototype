import React, { useState, useRef } from 'react';
import { UploadCloudIcon, FileTextIcon, XIcon } from 'lucide-react';
export type UploadedFile = {
  id: string;
  file: File;
};
type FileUploadFieldProps = {
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  acceptedTypes: string[];
  maxFileSizeMB: number;
  exactFileCount?: number;
};
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
export function FileUploadField({
  files,
  onChange,
  acceptedTypes,
  maxFileSizeMB,
  exactFileCount
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const maxBytes = maxFileSizeMB * 1024 * 1024;
  const isFull = exactFileCount !== undefined && files.length >= exactFileCount;
  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setError(null);
    const newOnes: UploadedFile[] = [];
    for (const file of Array.from(incoming)) {
      if (!acceptedTypes.includes(file.type)) {
        setError(`"${file.name}" is not a supported file type.`);
        continue;
      }
      if (file.size > maxBytes) {
        setError(`"${file.name}" exceeds the ${maxFileSizeMB} MB limit.`);
        continue;
      }
      newOnes.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file
      });
    }
    let next = [...files, ...newOnes];
    if (exactFileCount !== undefined && next.length > exactFileCount) {
      next = next.slice(0, exactFileCount);
      setError(`You can only upload ${exactFileCount} files.`);
    }
    onChange(next);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = '';
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };
  const removeFile = (id: string) => {
    setError(null);
    onChange(files.filter((f) => f.id !== id));
  };
  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!isFull) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isFull && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isFull) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={`flex flex-col items-center justify-center gap-3 rounded border-2 border-dashed py-8 px-6 transition-colors ${isFull ? 'border-grey-300 bg-grey-100 cursor-not-allowed opacity-60' : isDragging ? 'border-black bg-blue-50 cursor-pointer' : 'border-grey-500 bg-white/60 hover:bg-blue-50 cursor-pointer'}`}>
        
        <UploadCloudIcon className="w-8 h-8 text-grey-500" />
        <div className="text-center">
          <p className="text-base text-black">
            {isFull ?
            'Maximum files reached' :
            'Click to upload or drag and drop'}
          </p>
          <p className="text-sm text-grey-500 mt-1">
            PDF, JPG or PNG · max {maxFileSizeMB} MB
            {exactFileCount !== undefined &&
            ` · ${files.length}/${exactFileCount} files`}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          multiple={exactFileCount === undefined || exactFileCount > 1}
          onChange={handleInputChange}
          className="hidden" />
        
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* File list */}
      {files.length > 0 &&
      <ul className="flex flex-col gap-2">
          {files.map(({ id, file }) =>
        <li
          key={id}
          className="flex items-center gap-3 rounded border border-grey-300 bg-white px-3 py-2">
          
              <FileTextIcon className="w-5 h-5 text-grey-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-black truncate">{file.name}</p>
                <p className="text-xs text-grey-500">
                  {formatBytes(file.size)}
                </p>
              </div>
              <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeFile(id);
            }}
            aria-label={`Remove ${file.name}`}
            className="p-1 rounded hover:bg-grey-100 text-grey-500 hover:text-black transition-colors">
            
                <XIcon className="w-4 h-4" />
              </button>
            </li>
        )}
        </ul>
      }
    </div>);

}