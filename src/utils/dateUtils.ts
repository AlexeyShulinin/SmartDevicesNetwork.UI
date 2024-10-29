export const formatDateFromString = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ru-ru', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
