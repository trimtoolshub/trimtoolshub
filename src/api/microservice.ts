/**
 * Microservice API client for heavy operations
 * This handles server-side processing for operations that are too heavy for the browser
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.trimtoolshub.com';

export interface SignedUrlRequest {
  tool: string;
  operation: string;
  fileSize: number;
  fileName: string;
}

export interface SignedUrlResponse {
  uploadUrl: string;
  jobId: string;
  expiresAt: number;
}

export interface JobStatus {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  resultUrl?: string;
  error?: string;
}

/**
 * Request a signed URL for uploading a file
 */
export async function requestSignedUrl(request: SignedUrlRequest): Promise<SignedUrlResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/upload/signed-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to request signed URL: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Upload file to signed URL
 */
export async function uploadToSignedUrl(signedUrl: string, file: File): Promise<void> {
  const response = await fetch(signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }
}

/**
 * Submit job for processing
 */
export async function submitJob(jobId: string, options: Record<string, unknown>): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit job: ${response.statusText}`);
  }
}

/**
 * Get job status
 */
export async function getJobStatus(jobId: string): Promise<JobStatus> {
  const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}/status`);

  if (!response.ok) {
    throw new Error(`Failed to get job status: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Poll job status until completion
 */
export async function pollJobStatus(
  jobId: string,
  onProgress?: (progress: number) => void,
  interval: number = 2000
): Promise<JobStatus> {
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const status = await getJobStatus(jobId);
        
        if (status.progress !== undefined && onProgress) {
          onProgress(status.progress);
        }

        if (status.status === 'completed') {
          resolve(status);
        } else if (status.status === 'failed') {
          reject(new Error(status.error || 'Job failed'));
        } else {
          setTimeout(poll, interval);
        }
      } catch (error) {
        reject(error);
      }
    };

    poll();
  });
}

/**
 * Download result from job
 */
export async function downloadJobResult(resultUrl: string): Promise<Blob> {
  const response = await fetch(resultUrl);

  if (!response.ok) {
    throw new Error(`Failed to download result: ${response.statusText}`);
  }

  return response.blob();
}

/**
 * Process heavy operation via microservice
 */
export async function processHeavyOperation(
  tool: string,
  operation: string,
  file: File,
  options: Record<string, unknown> = {}
): Promise<{ blob: Blob; filename: string }> {
  // Request signed URL
  const { uploadUrl, jobId } = await requestSignedUrl({
    tool,
    operation,
    fileSize: file.size,
    fileName: file.name,
  });

  // Upload file
  await uploadToSignedUrl(uploadUrl, file);

  // Submit job
  await submitJob(jobId, options);

  // Poll for completion
  const status = await pollJobStatus(jobId, (progress) => {
    // Progress callback can be used for UI updates
    console.log(`Processing: ${progress}%`);
  });

  if (!status.resultUrl) {
    throw new Error('Job completed but no result URL provided');
  }

  // Download result
  const blob = await downloadJobResult(status.resultUrl);
  const filename = file.name.replace(/\.[^.]+$/, '') + '-processed.' + getFileExtension(operation);

  return { blob, filename };
}

/**
 * Get file extension based on operation
 */
function getFileExtension(operation: string): string {
  const extensionMap: Record<string, string> = {
    'convert': 'pdf',
    'compress': 'pdf',
    'merge': 'pdf',
    'split': 'pdf',
    'extract': 'pdf',
    'watermark': 'pdf',
    'ocr': 'pdf',
    'toWord': 'docx',
    'toCsv': 'csv',
  };
  return extensionMap[operation] || 'pdf';
}

