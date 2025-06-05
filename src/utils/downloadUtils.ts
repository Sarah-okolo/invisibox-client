
export const downloadPollResults = (poll: {
  id: string;
  title: string;
  question: string;
  createdAt: string;
  options: Array<{ text: string; votes: number }>;
}) => {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  
  // Create CSV content
  const csvContent = [
    // Header
    ['Poll Title', 'Question', 'Created Date', 'Total Votes'],
    [poll.title, poll.question, new Date(poll.createdAt).toLocaleDateString(), totalVotes.toString()],
    [], // Empty row
    ['Option', 'Votes', 'Percentage'],
    // Poll options data
    ...poll.options.map(option => [
      option.text,
      option.votes.toString(),
      totalVotes > 0 ? `${((option.votes / totalVotes) * 100).toFixed(1)}%` : '0%'
    ])
  ];

  // Convert to CSV string
  const csvString = csvContent
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  // Create and download file
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `poll-results-${poll.title.replace(/[^a-zA-Z0-9]/g, '-')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
