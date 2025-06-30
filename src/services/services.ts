export const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

export const trimContent = (content: string, n: number) => {
    const words = content.split(/\s+/);
    
    if (words.length <= n) {
        return content;
    }
    
    return words.slice(0, n).join(' ') + '…';
}