
export const downloadPollResults = async (poll: {
  id: string;
  title: string;
  question: string;
  createdAt: string;
  options: Array<{ text: string; votes: number }>;
}, chartElement: HTMLElement | null) => {
  if (!chartElement) {
    throw new Error('Chart element not found');
  }

  try {
    // Use html2canvas to capture the chart element
    const { default: html2canvas } = await import('html2canvas');
    
    const canvas = await html2canvas(chartElement, {
      background: 'null',
      useCORS: true,
      allowTaint: true,
    });

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create image blob');
      }

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `poll-chart-${poll.title.replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
    }, 'image/png', 1.0);

  } catch (error) {
    console.error('Error capturing chart:', error);
    throw new Error('Failed to capture chart image');
  }
};

export const sharePollResults = async (poll: {
  id: string;
  title: string;
  question: string;
  createdAt: string;
  options: Array<{ text: string; votes: number }>;
}, chartElement: HTMLElement | null) => {
  if (!chartElement) {
    throw new Error('Chart element not found');
  }

  try {
    // Use html2canvas to capture the chart element
    const { default: html2canvas } = await import('html2canvas');
    
    const canvas = await html2canvas(chartElement, {
      background: 'white',
      useCORS: true,
      allowTaint: true,
    });

    // Convert canvas to blob
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }
        resolve(blob);
      }, 'image/png', 1.0);
    });

  } catch (error) {
    console.error('Error capturing chart:', error);
    throw new Error('Failed to capture chart image');
  }
};
