import truncate from 'truncate-html';

export const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

export const trimContent = (content: string, n: number) => {
    return truncate(content, n, { byWords: true, ellipsis: '…' });
}