export const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: "numeric",
        month: "short",
        day: "2-digit",
    })
}